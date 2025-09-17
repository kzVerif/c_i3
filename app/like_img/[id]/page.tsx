import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LikeImagePageProps {
  params: { id: string };
}

interface LikeImg {
  id: number;
  name: string;
  s_desc: string;
  img: string;
  type: string;
  f_desc: string;
}

// mock data
// const data: LikeImg[] = [
//   {
//     id: 1,
//     name: "รางแห่งกาลเวลา",
//     desc: "รถไฟที่ถูกทิ้งร้างสะท้อนความเสื่อมสลายและร่องรอยของอดีตที่ยังคงอยู่",
//     img: "/img/1.jpg",
//     type: "Contemporary Urban Decay",
//     f_desc: `เป็นภาพรถไฟเก่าที่ถูกทิ้งร้าง สนิมเกาะ และหญ้าขึ้นรก
// เชิงนามธรรม สื่อถึง กาลเวลาที่ผ่านไป ความเสื่อมสลายของอารยธรรม หรือการถูกทอดทิ้ง
// รถไฟซึ่งเคยเป็นสัญลักษณ์ของการเคลื่อนไหวและการพัฒนา กลับกลายเป็น อนุสาวรีย์แห่งความทรงจำ
// ภาพนี้อาจบอกให้เรามองย้อนถึง สิ่งที่มนุษย์สร้างขึ้นย่อมมีวันเสื่อมสลาย`,
//   },
//   {
//     id: 2,
//     name: "คืนแห่งสมดุล",
//     desc: "บ้านกลางทุ่งนาที่อยู่ร่วมกับธรรมชาติ สัตว์ป่า และความมืดสว่างที่ถักทอกัน",
//     img: "/img/2.jpg",
//     type: "Symbolic Art",
//     f_desc: `เป็นภาพทุ่งนากับธรรมชาติ กลางคืนมีค้างคาว นกเค้าแมว สัตว์มากมายอยู่รอบ ๆ บ้านไม้เล็ก ๆ
// เชิงนามธรรม สะท้อนถึง การอยู่ร่วมกันระหว่างมนุษย์กับธรรมชาติ
// บ้านเล็กตรงกลางเป็นเหมือน สัญลักษณ์ของชีวิตคนชนบท ที่พึ่งพาธรรมชาติและถูกห้อมล้อมด้วยวงจรชีวิตของสัตว์ป่า
// บรรยากาศสื่อถึง ความสมดุลระหว่างความมืดและแสงสว่าง`,
//   },
//   {
//     id: 3,
//     name: "เงาแห่งความทุกข์",
//     desc: "ความเจ็บปวดและภาระของมนุษย์ที่ต้องแบกไว้ ท่ามกลางความมืดมน",
//     img: "/img/3.jpg",
//     type: "Figurative Art",
//     f_desc: `ภาพวาดคนหลายคนในบรรยากาศมืดมน หนึ่งในนั้นใส่เสื้อสีแดงที่โดดเด่น
// เชิงนามธรรม ภาพนี้อาจสื่อถึง ความทุกข์ ความเจ็บปวด และความเปราะบางของมนุษย์
// เสื้อแดงตรงกลางอาจหมายถึง ภาระหรือความผิดบาป ที่แต่ละคนต้องแบกไว้ ขณะที่คนรอบข้างอยู่ในสภาวะสิ้นหวัง`,
//   },
//   {
//     id: 4,
//     name: "งานเลี้ยงที่บิดเบือน",
//     desc: "โต๊ะอาหารที่ควรจะเป็นสัญลักษณ์ของความสุขกลับกลายเป็นภาพสะท้อนความบิดเบี้ยวของสังคม",
//     img: "/img/4.jpg",
//     type: "Satirical Art",
//     f_desc: `เป็นฉากครอบครัวนั่งกินข้าว แต่ทุกคนมีใบหน้าบิดเบี้ยวหรือกลายพันธุ์ (เป็นสัตว์ สัตว์ครึ่งบกครึ่งน้ำ หรือหน้าตาแปลกประหลาด)
// เชิงนามธรรมคือการ วิพากษ์สังคม ว่าภายใต้ความเป็น "ครอบครัวอบอุ่น" กลับเต็มไปด้วย ความบิดเบือน ความไม่สมบูรณ์ และความจริงที่น่ากลัว
// สื่อถึง ความหน้าซื่อใจคด ของมนุษย์และสังคมในชีวิตประจำวัน`,
//   },
//   {
//     id: 5,
//     name: "วิหารแห่งป่า",
//     desc: "ผืนป่ากลายเป็นสถานที่ศักดิ์สิทธิ์ แฝงด้วยพระพักตร์และจิตวิญญาณแห่งธรรมะ",
//     img: "/img/5.jpg",
//     type: "Spiritual Symbolism",
//     f_desc: `ภาพขาวดำเต็มไปด้วยรายละเอียดป่า ต้นไม้ รากไม้ และใบหน้าของพระพุทธรูปแฝงอยู่ตามซอกมุม
// เชิงนามธรรม สื่อถึง ความศักดิ์สิทธิ์ของธรรมชาติ
// ป่าไม้กลายเป็นวัดวาอารามที่เชื่อมโยงกับจิตวิญญาณ
// ภาพนี้อาจกำลังบอกว่า ธรรมชาติและศาสนาเป็นสิ่งเดียวกัน และการปกป้องธรรมชาติคือการปกป้องจิตวิญญาณ`,
//   },
// ];

export default async function LikeImage({ params }: LikeImagePageProps) {
  const prisma = new PrismaClient();
  const data: LikeImg[] = await prisma.likeImg.findMany();
  const image = data.find((item) => String(item.id) === params.id);

  if (!image) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">
          ❌ ไม่พบภาพที่คุณเลือก
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-200 font-sans">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full transition transform hover:-translate-y-1 hover:shadow-2xl">
        {/* รูปภาพ */}
        <div className="relative w-full h-96">
          <Image
            src={image.img}
            alt={image.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* เนื้อหา */}
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {image.name}
          </h1>
          <p className="text-gray-700 text-lg italic">{image.s_desc}</p>
          <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">
            {image.f_desc}
          </p>

          {/* ประเภท */}
          <span className="inline-block mt-6 px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
            ประเภท: {image.type}
          </span>

          {/* ปุ่มกลับ */}
          <Link href={"/"}>
            <button className="mt-6 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              ⬅ กลับสู่หน้าแรก
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
