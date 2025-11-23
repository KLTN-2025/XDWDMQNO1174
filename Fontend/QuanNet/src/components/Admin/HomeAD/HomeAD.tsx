import LeftSideAD from "../LeftSideAD/LeftSideAD";

export function HomeAD(){
    return(
        <div className="flex">
            <LeftSideAD />
            <div className="w-[80%] h-screen flex text-center justify-center items-center bg-[#000000]">
                <img className="" src="../logo.png" alt="" />
            </div>                                    
        </div>
    );
}