import { Card, CardContent } from "@/components/ui/card";

const StoreCardHome = () => {
  return (
    // <div className="flex flex-col gap-3.5 items-center">
    //   <Card className="h-52 w-52  shadow-xl shadow-black bg-[url(/asset/section.png)] bg-contain">
    //     <CardContent className="h-full relative w-full flex items-center justify-center ">
    //       <img src={image} className="w-full absolute top-0 left-0 backdrop-blur-[2px] h-[100%] object-fill" />
    //     </CardContent>
    //   </Card>
    //   <h1
    //   className="text-xl uppercase font-bold text-gray-500 italic underline"
    //   style={{letterSpacing:"1px", textShadow:"1px 1px 4px #000"}}
    //   >{title}</h1>
    // </div>
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <img
              src="https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400"
              alt="Jersey"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <p className="mt-4 text-gray-700 font-semibold">JERSEY NUMBER 23 ICONIC</p>
            <strong className="text-[#7e57c2] text-[16px] mt-2">$ 1,400.00</strong>
          </div>
  );
};

export default StoreCardHome;
