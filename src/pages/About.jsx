import { FaRegLightbulb, FaUsers, FaCogs } from "react-icons/fa";

function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-base-100 mt-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Biz haqimizda</h2>
      
      <p className="text-center text-gray-500 mb-6">
        Ushbu platforma sizga eng yaxshi suratlarni topish, saqlash va ulashish imkoniyatini beradi. 
        Biz foydalanuvchilarga qulay interfeys va tezkor xizmatlarni taqdim etamiz.
      </p>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow">
          <FaRegLightbulb className="text-primary text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Innovatsion Platforma</h3>
            <p className="text-gray-600">Eng zamonaviy texnologiyalar asosida qurilgan.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow">
          <FaUsers className="text-primary text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Katta Jamiyat</h3>
            <p className="text-gray-600">Ko‘plab foydalanuvchilar tomonidan ishonch bilan foydalaniladi.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow">
          <FaCogs className="text-primary text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Qulay Funksiyalar</h3>
            <p className="text-gray-600">Rasmlarni izlash, saqlash va ulashish imkoniyati.</p>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8">
        <strong>Biz bilan bog‘laning:</strong> <a href="/contact" className="text-blue-500 hover:underline">Bog‘lanish</a>
      </p>
    </div>
  );
}

export default About;
