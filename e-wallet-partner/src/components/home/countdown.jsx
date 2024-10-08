import Countdown from "react-countdown"
export default function CountDownPage(){
    const targetDate = (new Date("2024/08/28 7:00:00")).getTime();
    return(<div className="max-w-[1200px] mx-auto text-center p-20">
        <div className="text-blue-600 font-bold text-3xl my-5">First day of school</div>
        <Countdown className="text-8xl font-semibold" date={targetDate} ></Countdown>
    </div>)
}