const furnitureData = [
    {
      id: 1,
      title: "Egyptian Vase",
      category: "Home Office",
      description:
        "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.",
      image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/egyptian-brown-vase-300x300.png",
      price: "400.00",
      instock: "true"
    },
    {
        id: 2,
        title: "Green Living Room Sofa",
        category: "Living Room",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-green-sofa-300x300.png",
        price:"980.00",
        instock: "true"
    },
    {
        id: 3,
        title: "King Size Master Bedroom",
        category: "Bedroom",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis pr.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/king-size-master-bedroom-300x300.png",
        price:"990.00",
        instock: "true"
    },
    {
        id: 4,
        title: "Kitchen Cabinet",
        category: "Cabinet",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kitchen-furniture-cabinet-300x300.png",
        price:"890.00",
        instock: "false"
    },
    {
        id: 5,
        title: "Modern Emerald Fabric Chair",
        category: "Chair",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-green-fabric-chair-300x300.png",
        price:"860.00",
        instock: "true"
    },
    {
        id: 6,
        title: "Wall Hanging Cabinet",
        category: "Cabinet",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/wall-hanging-cabinet-300x300.png",
        price:"840.00",
        instock: "true"
    },
    {
        id: 7,
        title: "White Kitchen Island",
        category: "Kitchen",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident c.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kitchen-island-set-300x300.png",
        price:"670.00",
        instock: "true"
    },
    {
        id: 8,
        title: "Wooden Bath Room Stool",
        category: "Bathroom",
        description:
          "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/wooden-stool-300x300.png",
        price:"220.50",
        instock: "true"
    },
    {
        id: 9,
        title: "Wooden Console Table",
        category: "Bedroom",
        description:
          "Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/wooden-console-table-300x300.png",
        price:"724.00",
        instock: "false"
    },
    {
        id: 10,
        title: "Brown Circle Stool",
        category: "Kitchen",
        description:
          "Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/brown-wooden-stool-300x300.png",
        price:"224.00",
        instock: "true"
    },
    {
        id: 11,
        title: "Brown Living Room Sofa",
        category: "Living Room",
        description:
          "Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-brown-sofa-300x300.png",
        price:"345.00",
        instock: "false"
    },
    {
        id: 12,
        title: "Beige Working Chair With Armrest",
        category: "Home Office",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis proident cupiditate habitant assumenda. Pariatur minus nibh necessitatibus sociis minim, consectetur dapibus.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/working-chair-with-armrest-300x300.png",
        price:"784.00",
        instock: "true"
    },
    {
        id: 13,
        title: "Ceramic Oval Bathtub",
        category: "Bathroom",
        description:
          "Nemo malesuada animi consectetur, cras consectetuer laborum tenetur, cum, lacus nemo imperdiet facilisis! Aute metus, lorem primis anim. Eros dolorem.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/cream-ceramic-oval-bathtub-300x300.png",
        price:"465.00",
        instock: "true"
    },
    {
        id: 14,
        title: "Black Metal Lamp",
        category: "Home Office",
        description:
          "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/black-metal-lamp-300x300.png",
        price:"265.00",
        instock: "false"
    },
    {
        id: 15,
        title: "Bathroom Wooden Table",
        category: "Bathroom",
        description:
          "Habitasse eaque wisi molestie, mollis pharetra convallis exercitation, distinctio eu arcu fugit nibh donec exercitationem, quisque imperdiet mattis.",
        image: "https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bathroom-wooden-table-300x300.png",
        price:"550.00",
        instock: "true"
    }
    
  ];
  
  export default furnitureData;