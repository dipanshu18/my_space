const dotenv = require("dotenv");
dotenv.config();

const ffmpeg = require("fluent-ffmpeg");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("node:fs");
const path = require("node:path");

const USER_ID = process.env.USER_ID;
const VIDEO_ID = process.env.VIDEO_ID;
const S3_BASE_KEY = `${USER_ID}/${VIDEO_ID}`;

const inputPath = path.join(__dirname, "videos", "original.mp4");
const tempDir = path.join(__dirname, "temp");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

async function uploadDirectoryToS3(dirPath, s3BaseKey) {
  const items = await fs.promises.readdir(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.relative(tempDir, fullPath); // preserve nested structure
    const s3Key = `${s3BaseKey}/${relativePath}`.replace(/\\/g, "/"); // ensures forward slashes

    if (item.isDirectory()) {
      await uploadDirectoryToS3(fullPath, s3BaseKey); // recurse into subdir
    } else {
      const fileStream = fs.createReadStream(fullPath);
      const contentType = item.name.endsWith(".m3u8")
        ? "application/x-mpegURL"
        : "video/MP2T";

      const uploadParams = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: fileStream,
        ContentType: contentType,
      });

      console.log(`📤 Uploading to S3: ${s3Key}`);
      await s3.send(uploadParams);
    }
  }
}

function createHLS() {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .inputOptions("-hide_banner")
      .outputOptions([
        "-filter_complex",
        "[0:v]split=4[v1][v2][v3][v4];" +
          "[v1]scale=w=640:h=360[vout1];" +
          "[v2]scale=w=854:h=480[vout2];" +
          "[v3]scale=w=1280:h=720[vout3];" +
          "[v4]scale=w=1920:h=1080[vout4]",
        "-map",
        "[vout1]",
        "-map",
        "[vout2]",
        "-map",
        "[vout3]",
        "-map",
        "[vout4]",
        "-map",
        "0:a",
        "-map",
        "0:a",
        "-map",
        "0:a",
        "-map",
        "0:a",
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "-preset",
        "veryfast",
        "-g",
        "48",
        "-sc_threshold",
        "0",
        "-f",
        "hls",
        "-hls_time",
        "6",
        "-hls_list_size",
        "0",
        "-hls_segment_filename",
        `${tempDir}/v%v/fileSequence%d.ts`,
        "-master_pl_name",
        "master.m3u8",
        "-var_stream_map",
        "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3",
      ])
      .output(`${tempDir}/v%v/prog_index.m3u8`)
      .on("start", (cmd) => console.log("FFmpeg started with command:", cmd))
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

async function init() {
  try {
    console.log("Creating HLS streams...");
    await createHLS();

    console.log("Uploading to S3...");
    await uploadDirectoryToS3(tempDir, S3_BASE_KEY);

    console.log("✅ Done!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

init();
