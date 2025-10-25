import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function AboutUs() {
    return (
        <div className="bg-[#D3FFCC] h-screen">
            <Header />

            {/* body */}
            <div className="bg-white py-4 pl-3">
                    <p className="font-bold text-3xl">🎮 THẾ GIỚI GAMING: PHÒNG GAME CHUYÊN NGHIỆP HÀNG ĐẦU TẠI ĐÀ NẴNG 🏆</p>
                    <p className="font-medium my-3 leading-7">Chào mừng bạn đến với Thế Giới Gaming!</p>
                    <p>Thế Giới Gaming là phòng game hàng đầu tại Đà Nẵng, nổi bật với thiết kế hiện đại và không gian đẳng cấp, được tạo ra nhằm đáp ứng nhu cầu của cả những game thủ chuyên nghiệp và những người đam mê eSports.</p>
                    <p className="my-3 leading-7">Với hệ thống máy tính cấu hình cao, cùng các trang thiết bị tiên tiến, phòng game cam kết mang đến cho người chơi trải nghiệm chơi game mượt mà, chuyên nghiệp, và tối ưu nhất trong mọi tựa game, từ những trò chơi chiến thuật (MOBA) đến những tựa game bắn súng (FPS) và đối kháng (Fighting).</p>
                    <div className="flex">
                        <img className="w-[58%] h-[500px] mr-3" src="../quan2.png" alt="" />
                        <img className="w-[40%] h-[500px]" src="../quan3.png" alt="" />
                    </div>
                    <div className="flex mt-5">
                        <div className="w-[60%] pr-5">
                            <p className="font-bold text-2xl">Điểm nổi bật của Thế Giới Gaming:</p>
                            <ul className="list-disc ml-5 mt-2 leading-7">
                                <li><span className="font-medium">Cấu hình máy tính vượt trội:</span> Thế Giới Gaming sở hữu dàn PC với cấu hình mạnh mẽ, đảm bảo game thủ có thể chiến game ở mức thiết lập đồ họa cao nhất mà không lo bị giật lag.</li>
                                <li><span className="font-medium">Không gian chơi game hiện đại và sạch sẽ:</span> Không chỉ dừng lại ở cấu hình máy, chúng tôi còn gây ấn tượng với không gian chơi game chuyên nghiệp và sạch sẽ, bởi máy khách sẽ được lau dọn ngay khi khách chơi trước quay về nên sẽ mang lại cảm giác thoải mái cho người chơi.</li>
                                <li><span className="font-medium">Dịch vụ chuyên nghiệp:</span> Từ khâu tiếp đón khách hàng, hỗ trợ kỹ thuật đến chăm sóc khách hàng, Thế Giới Gaming luôn đặt tiêu chí chuyên nghiệp lên hàng đầu, đảm bảo mang đến cho game thủ trải nghiệm tốt nhất.</li>
                            </ul>
                            <p className="font-bold text-2xl">Lý do nên chọn Thế Giới Gaming:</p>
                            <ul className="ml-5 mt-2 leading-7">
                                <li><span className="font-medium">1. Cấu hình mạnh, chiến game mượt mà: </span>Thế Giới Gaming là lựa chọn lý tưởng cho các game thủ đam mê mọi tựa game đòi hỏi đồ họa cao như PUBG, Valorant, hay Dota 2/LoL.</li>
                                <li><span className="font-medium">2. Không gian chuyên nghiệp, thoải mái: </span>Không gian phòng game được thiết kế hiện đại, thoáng đãng, kết hợp với hệ thống điều hòa mát lạnh, giúp game thủ có thể chơi game trong thời gian dài mà không cảm thấy khó chịu.</li>
                                <li><span className="font-medium">3.  Dịch vụ chăm sóc khách hàng tận tình: </span>Đội ngũ nhân viên luôn sẵn sàng hỗ trợ người chơi, từ việc chọn máy, xử lý sự cố kỹ thuật đến việc phục vụ đồ uống và ăn nhẹ. Tất cả đều nhằm mang đến trải nghiệm dịch vụ chuyên nghiệp nhất cho khách hàng.</li>
                            </ul>
                        </div>
                        <img className="w-[39%]" src="../sodopm.png" alt="" />
                    </div>
                    <div className="font-bold pr-5 leading-8 mt-5">
                        <p className="">Thông Tin Liên Hệ (Cơ Sở Duy Nhất):</p>
                        <ul className="list-disc ml-5">
                            <li>Tên Quán: Thế Giới Gaming</li>
                            <li>Địa chỉ: 239/2 Dũng Sĩ Thanh Khê, Đà Nẵng</li>
                        </ul>
                    </div>
            </div>

            <Footer />
        </div>
    );
}