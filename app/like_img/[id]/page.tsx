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
