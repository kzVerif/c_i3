import { Prisma, PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LikeImg {
  id: number;
  name: string;
  s_desc: string;
  img: string;
  type: string;
  f_desc: string;
}

export default async function Home() {
  const prisma = new PrismaClient();
  const data: LikeImg[] = await prisma.likeImg.findMany();
  //   const data: LikeImg[] = [
  //     {
  //       id: 1,
  //       name: "รางแห่งกาลเวลา",
  //       desc: "รถไฟที่ถูกทิ้งร้างสะท้อนความเสื่อมสลายและร่องรอยของอดีตที่ยังคงอยู่",
  //       img: "/img/1.jpg",
  //       type: "Contemporary Urban Decay",
  //       f_desc: `เป็นภาพรถไฟเก่าที่ถูกทิ้งร้าง สนิมเกาะ และหญ้าขึ้นรก
  // เชิงนามธรรม สื่อถึง กาลเวลาที่ผ่านไป ความเสื่อมสลายของอารยธรรม หรือการถูกทอดทิ้ง
  // รถไฟซึ่งเคยเป็นสัญลักษณ์ของการเคลื่อนไหวและการพัฒนา กลับกลายเป็น อนุสาวรีย์แห่งความทรงจำ
  // ภาพนี้อาจบอกให้เรามองย้อนถึง สิ่งที่มนุษย์สร้างขึ้นย่อมมีวันเสื่อมสลาย`,
  //     },
  //     {
  //       id: 2,
  //       name: "คืนแห่งสมดุล",
  //       desc: "บ้านกลางทุ่งนาที่อยู่ร่วมกับธรรมชาติ สัตว์ป่า และความมืดสว่างที่ถักทอกัน",
  //       img: "/img/2.jpg",
  //       type: "Symbolic Art",
  //       f_desc: `เป็นภาพทุ่งนากับธรรมชาติ กลางคืนมีค้างคาว นกเค้าแมว สัตว์มากมายอยู่รอบ ๆ บ้านไม้เล็ก ๆ
  // เชิงนามธรรม สะท้อนถึง การอยู่ร่วมกันระหว่างมนุษย์กับธรรมชาติ
  // บ้านเล็กตรงกลางเป็นเหมือน สัญลักษณ์ของชีวิตคนชนบท ที่พึ่งพาธรรมชาติและถูกห้อมล้อมด้วยวงจรชีวิตของสัตว์ป่า
  // บรรยากาศสื่อถึง ความสมดุลระหว่างความมืดและแสงสว่าง`,
  //     },
  //     {
  //       id: 3,
  //       name: "เงาแห่งความทุกข์",
  //       desc: "ความเจ็บปวดและภาระของมนุษย์ที่ต้องแบกไว้ ท่ามกลางความมืดมน",
  //       img: "/img/3.jpg",
  //       type: "Figurative Art",
  //       f_desc: `ภาพวาดคนหลายคนในบรรยากาศมืดมน หนึ่งในนั้นใส่เสื้อสีแดงที่โดดเด่น
  // เชิงนามธรรม ภาพนี้อาจสื่อถึง ความทุกข์ ความเจ็บปวด และความเปราะบางของมนุษย์
  // เสื้อแดงตรงกลางอาจหมายถึง ภาระหรือความผิดบาป ที่แต่ละคนต้องแบกไว้ ขณะที่คนรอบข้างอยู่ในสภาวะสิ้นหวัง`,
  //     },
  //     {
  //       id: 4,
  //       name: "งานเลี้ยงที่บิดเบือน",
  //       desc: "โต๊ะอาหารที่ควรจะเป็นสัญลักษณ์ของความสุขกลับกลายเป็นภาพสะท้อนความบิดเบี้ยวของสังคม",
  //       img: "/img/4.jpg",
  //       type: "Satirical Art",
  //       f_desc: `เป็นฉากครอบครัวนั่งกินข้าว แต่ทุกคนมีใบหน้าบิดเบี้ยวหรือกลายพันธุ์ (เป็นสัตว์ สัตว์ครึ่งบกครึ่งน้ำ หรือหน้าตาแปลกประหลาด)
  // เชิงนามธรรมคือการ วิพากษ์สังคม ว่าภายใต้ความเป็น "ครอบครัวอบอุ่น" กลับเต็มไปด้วย ความบิดเบือน ความไม่สมบูรณ์ และความจริงที่น่ากลัว
  // สื่อถึง ความหน้าซื่อใจคด ของมนุษย์และสังคมในชีวิตประจำวัน`,
  //     },
  //     {
  //       id: 5,
  //       name: "วิหารแห่งป่า",
  //       desc: "ผืนป่ากลายเป็นสถานที่ศักดิ์สิทธิ์ แฝงด้วยพระพักตร์และจิตวิญญาณแห่งธรรมะ",
  //       img: "/img/5.jpg",
  //       type: "Spiritual Symbolism",
  //       f_desc: `ภาพขาวดำเต็มไปด้วยรายละเอียดป่า ต้นไม้ รากไม้ และใบหน้าของพระพุทธรูปแฝงอยู่ตามซอกมุม
  // เชิงนามธรรม สื่อถึง ความศักดิ์สิทธิ์ของธรรมชาติ
  // ป่าไม้กลายเป็นวัดวาอารามที่เชื่อมโยงกับจิตวิญญาณ
  // ภาพนี้อาจกำลังบอกว่า ธรรมชาติและศาสนาเป็นสิ่งเดียวกัน และการปกป้องธรรมชาติคือการปกป้องจิตวิญญาณ`,
  //     },
  //   ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 font-sans min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        🎨 แกลเลอรีรูปภาพที่ชื่นชอบ
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
          >
            {/* รูปภาพ */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* เนื้อหา */}
            <div className="flex flex-col flex-1 p-6">
              <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
              <p className="text-gray-600 text-sm mt-2 flex-1 line-clamp-3">
                {item.s_desc}
              </p>

              {/* ประเภท */}
              <span className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 w-fit">
                {item.type}
              </span>

              {/* ปุ่ม */}
              <Link href={`/like_img/${item.id}`}>
                <button className="mt-5 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition w-full">
                  View More →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
