/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import "../../pages/About/about.css";
import ImageIntro from "../../assets/furnitureIntro.jpg";
import ImageDesign from "../../assets/customDesign.png";
import ImageFast from "../../assets/fastDe.png";
import ImageCustom from "../../assets/customerSupport.png";

function About() {
  const text = "Sizin şəxsi zövqünüzə uyğun olaraq unikallığı təmin edir";
  const text2 =
    "Biz qapınızın ağzına qədər sürətli və təhlükəsiz çatdırılmaya zəmanət veririk.";
  const text3 =
    "Bizim xüsusi müştəri dəstək komandamız hər hansı bir sorğu ilə sizə kömək etməyə həmişə hazırdır.";

  const trimTitle = (title, maxLength) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <div className="aboutSection">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-lg-6 col-md-12 aboutSection-left">
            <h2>Mebel Mağazamız Haqqında</h2>
            <p>
              Sənətkarlığın yaradıcılıqla qovuşduğu mebel mağazamıza xoş
              gəlmisiniz. Onilliklərdir ki, biz evləri rahat və şık məkanlara
              çevirən yüksək keyfiyyətli mebel təqdim edirik.
            </p>
            <p>
              Bizim missiyamız hər bir parçanın zamanın sınağından çıxmasını
              təmin etmək üçün dizayn və davamlılığı birləşdirərək ən yaxşı
              mebel həllərini təklif etməkdir.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 aboutSection-right">
            <img
              src={ImageIntro}
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>
        </div>

        <div className="row my-5">
          <div className="col-md-12 text-center historySection">
            <h2>Bizim Hekayəmiz</h2>
            <p className="lead">
              Kiçik bir ailə biznesindən etibarlı mebel brendinə qədər keyfiyyət
              və müştəri məmnuniyyətini ön planda tutaraq inkişaf etdik.
            </p>
          </div>
          <div className="col-md-12 historySection-timeline">
            <div className="timeline">
              <div className="timeline-item">
                <h5>1980: Təvazökar başlanğıclarımız</h5>
                <p>
                  Biz kiçik bir dülgərlik emalatxanası kimi başladıq, yerli
                  icmamız üçün sifarişli mebel parçaları hazırlayırıq.
                </p>
              </div>
              <div className="timeline-item">
                <h5>2000: Ölkə miqyasında genişlənir</h5>
                <p>
                  Minilliyin sonunda biznesimiz genişləndi və ölkə daxilində
                  evləri mebellə təmin etdi.
                </p>
              </div>
              <div className="timeline-item">
                <h5>2020: Qlobal Brend</h5>
                <p>
                  Biz indi dünya miqyasında ən yaxşı mebel brendlərindən biri
                  kimi tanınırıq, yeniliklər etməyə və ilham verməyə davam
                  edirik.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-md-12 text-center offerSection">
            <h2>Biz nə təklif edirik</h2>
            <p className="lead">
              Mebel alış-veriş təcrübənizi artırmaq üçün yüksək səviyyəli
              xidmətlər təqdim etməyə sadiqik.
            </p>
          </div>
          <div className="col-md-12 col-lg-4 col-sm-12 offerSection-card">
            <div className="card">
              <img
                src={ImageDesign}
                className="card-img-top"
                alt="Custom Design"
              />
              <div className="card-body-body">
                <h5 className="card-title">Xüsusi Dizaynlar</h5>
                <p className="card-text">{trimTitle(text, 35)}</p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-sm-12 offerSection-card">
            <div className="card">
              <img
                src={ImageFast}
                className="card-img-top"
                alt="Fast Delivery"
              />
              <div className="card-body-body">
                <h5 className="card-title">Sürətli Çatdırılma</h5>
                <p className="card-text">{trimTitle(text2, 35)}</p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-sm-12 offerSection-card">
            <div className="card">
              <img
                src={ImageCustom}
                className="card-img-top"
                alt="Customer Support"
              />
              <div className="card-body-body">
                <h5 className="card-title">Müştəri dəstəyi</h5>
                <p className="card-text">{trimTitle(text3, 35)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-md-12 text-center customerSection">
            <h2>Müştərilərimizin Dedikləri</h2>
          </div>
          <div className="col-md-6 customerSection-testimonial">
            <div className="testimonial">
              <blockquote>
                "Bu mağazadan aldığım mebel qonaq otağımı tamamilə dəyişdirdi.
                Keyfiyyət inanılmazdır. "
              </blockquote>
              <cite>- Murad Babayev</cite>
            </div>
          </div>
          <div className="col-md-6 customerSection-testimonial">
            <div className="testimonial">
              <blockquote>
                "İnanılmaz müştəri xidməti! Evim üçün mükəmməl divanı
                fərdiləşdirmək üçün yuxarıda və kənarda getdilər."
              </blockquote>
              <cite>- Fərid Bağırov</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
