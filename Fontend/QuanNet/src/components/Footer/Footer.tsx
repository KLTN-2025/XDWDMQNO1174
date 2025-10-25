export default function Footer() {
  return (
  <div className="bg-[url('/footer.png')] h-[410px] bg-cover bg-center text-white flex justify-between">
          <div className="pt-10 pl-20">
            <h1 className="font-bold text-3xl">KẾT NỐI VỚI CHÚNG TÔI</h1>
            <ul>
                <li>
                  <a href="" className="flex items-center my-3">
                    <img src="../face.png" alt="" />
                    <p className="font-medium ml-2">Thế Giới Gaming - 239/2 Dũng Sĩ Thanh Khê</p>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center my-3">
                    <img src="../zalo.png" alt="" />
                    <p className="font-medium ml-2">Thế giới gaming</p>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center my-3">
                    <img src="../phone.png" alt="" />
                    <p className="font-medium ml-2">0788.644.694</p>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center my-3">
                    <img src="../mail.png" alt="" />
                    <p className="font-medium ml-2">thegioigamingdn@gmail.com</p>
                  </a>
                </li>
                <li>
                  <a href="" className="flex items-center my-3">
                    <img src="../position.png" alt="" />
                    <p className="font-medium ml-2">239/2 Dũng Sĩ Thanh Khê, Thanh Khê, Đà Nẵng</p>
                  </a>
                </li>
            </ul>
          </div>
          <div className="pt-10 ">
            <p className="font-bold text-3xl">TIN TỨC</p>
            <div className="flex my-7 items-center">
              <div className="w-[150px] h-[70px]">
                <img src="../GiaiDau.png" alt="" />
              </div>
              <div className="ml-3">
                <p className="font-medium">Giải đấu tft lần thứ 1 của Thế Giới Gaming</p>
                <span>9:00, 19/9/2025</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[150px] h-[70px]">
                <img src="../GiaiDau.png" alt="" />
              </div>
              <div className="ml-3">
                <p className="font-medium">Giải đấu tft lần thứ 2 của Thế Giới Gaming</p>
                <span>9:00, 25/9/2025</span>
              </div>
            </div>
          </div>
      </div>
    );
};