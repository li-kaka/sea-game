// Yuren catalog with the approved shared three-level classification.
const WARDROBE_RARITIES={"N": "普通", "R": "稀有", "SR": "典藏"};
const WARDROBE_CATEGORIES=[
  {
    "id": "suit",
    "name": "套装",
    "items": [
      {
        "id": "orange-juice-suit",
        "name": "橙汁饮料套装",
        "icon": "character/upstream/svg/orange-juice-suit.svg",
        "pieces": {
          "skin": "olive-color-skin",
          "outerwear": "drink-cup",
          "pants": "white-boxers"
        },
        "rarity": "R"
      },
      {
        "id": "warrior-suit",
        "name": "战士套装",
        "icon": "character/upstream/svg/warrior-suit.svg",
        "pieces": {
          "helmet": "black-spiky-hair",
          "skin": "muscle-tan",
          "pants": "black-gray-sweatpants",
          "shoes": "batfish-boots",
          "cape": "greatsword"
        },
        "rarity": "SR"
      },
      {
        "id": "ronin-suit",
        "name": "浪客套装",
        "icon": "character/upstream/svg/ronin-suit.svg",
        "pieces": {
          "skin": "muscle-tan",
          "helmet": "triangle-straw-hat",
          "neck": "small-red-scarf",
          "outerwear": "ronin-shirt",
          "pants": "black-red-sweatpants",
          "shoes": "ninja-worker-boots",
          "cape": "paired-swords"
        },
        "rarity": "R"
      },
      {
        "id": "ninja-suit",
        "name": "忍者套装",
        "icon": "character/upstream/svg/ninja-suit.svg",
        "pieces": {
          "skin": "flesh-3",
          "helmet": "ninja-hood",
          "outerwear": "ninja-shirt",
          "pants": "ninja-sweatpants",
          "shoes": "ninja-worker-boots",
          "cape": "dual-swords"
        },
        "rarity": "R"
      },
      {
        "id": "monk-suit",
        "name": "僧人套装",
        "icon": "character/upstream/svg/monk-suit.svg",
        "pieces": {
          "skin": "flesh-3",
          "helmet": "lotus-hat",
          "neck": "prayer-beads",
          "outerwear": "monk-robe",
          "pants": "white-loose-wide-trousers",
          "shoes": "brown-shoes"
        },
        "rarity": "R"
      },
      {
        "id": "walker-suit",
        "name": "行者套装",
        "icon": "character/upstream/svg/walker-suit.svg",
        "pieces": {
          "skin": "monkey",
          "helmet": "golden-circlet",
          "neck": "small-blue-scarf",
          "outerwear": "walker-shirt",
          "pants": "walker-sweatpants",
          "shoes": "black-worker-boots"
        },
        "rarity": "SR"
      },
      {
        "id": "chef-suit",
        "name": "厨师套装",
        "icon": "character/upstream/svg/chef-suit.svg",
        "pieces": {
          "skin": "flesh-3",
          "helmet": "chef-hat",
          "outerwear": "white-chef-jacket",
          "pants": "white-sweatpants",
          "shoes": "gray-plain-shoes"
        },
        "rarity": "R"
      },
      {
        "id": "gyaru-suit",
        "name": "辣妹套装",
        "icon": "character/upstream/svg/gyaru-suit.svg",
        "pieces": {
          "skin": "gyaru",
          "helmet": "yellow-bow-hair",
          "shirt": "pink-heart-bra",
          "pants": "pink-polka-boxers",
          "shoes": "striped-long-socks-shoes"
        },
        "rarity": "R"
      },
      {
        "id": "farmer-suit",
        "name": "农夫套装",
        "defaultSkin": true,
        "icon": "character/upstream/svg/farmer-suit.svg",
        "pieces": {
          "neck": "scarf",
          "pants": "jumpsuit"
        },
        "rarity": "N"
      },
      {
        "id": "fisher-suit",
        "name": "渔人套装",
        "icon": "character/upstream/svg/fisher-suit.svg",
        "pieces": {
          "skin": "blue-color-skin",
          "helmet": "yellow-hat",
          "outerwear": "green-vest",
          "shoes": "brown-worker-boots",
          "pants": "worker-trousers"
        },
        "rarity": "N"
      },
      {
        "id": "working-fish-suit",
        "name": "工鱼套装",
        "icon": "character/upstream/svg/working-fish-suit.svg",
        "pieces": {
          "skin": "cyan-color-skin",
          "pants": "navy-jumpsuit",
          "shirt": "red-cropped-tee-2"
        },
        "rarity": "N"
      },
      {
        "id": "beach-suit",
        "name": "海滩套装",
        "icon": "character/upstream/svg/beach-suit.svg",
        "pieces": {
          "skin": "flesh-4",
          "shirt": "shell-top",
          "pants": "green-ultra-shorts"
        },
        "rarity": "N"
      },
      {
        "id": "streaker-suit",
        "name": "裸奔套装",
        "icon": "character/upstream/svg/streaker-suit.svg",
        "pieces": {
          "skin": "lipstick-fish",
          "helmet": "pink-ribbon-hair",
          "shirt": "mosaic-top",
          "pants": "mosaic-pants"
        },
        "rarity": "R"
      },
      {
        "id": "angel-suit",
        "name": "天使套装",
        "icon": "character/upstream/svg/angel-suit.svg",
        "pieces": {
          "skin": "flesh-8",
          "helmet": "angel-halo",
          "shirt": "angel-vest",
          "pants": "white-loose-wide-trousers",
          "cape": "angel-wings"
        },
        "rarity": "SR"
      },
      {
        "id": "astronaut-suit",
        "name": "宇航员套装",
        "icon": "character/upstream/svg/astronaut-suit.svg",
        "pieces": {
          "helmet": "space-helmet",
          "outerwear": "space-shirt",
          "pants": "space-trousers",
          "shoes": "orange-shoes",
          "gloves": "space-gloves"
        },
        "rarity": "SR"
      },
      {
        "id": "topknot-suit",
        "name": "小辫子男套装",
        "icon": "character/upstream/svg/topknot-suit.svg",
        "pieces": {
          "skin": "flesh-6",
          "helmet": "topknot-hair",
          "shirt": "white-tie-shirt",
          "outerwear": "charcoal-blazer",
          "pants": "dark-gray-slight-wide-trousers",
          "shoes": "colorblock-shoes"
        },
        "rarity": "N"
      },
      {
        "id": "secondary-suit",
        "name": "中学生套装",
        "icon": "character/upstream/svg/secondary-suit.svg",
        "pieces": {
          "skin": "flesh-5",
          "helmet": "secondary-hat",
          "outerwear": "secondary-jacket",
          "pants": "black-slight-wide-trousers",
          "shoes": "brown-shoes"
        },
        "rarity": "N"
      },
      {
        "id": "student-suit",
        "name": "小学生套装",
        "icon": "character/upstream/svg/student-suit.svg",
        "pieces": {
          "skin": "flesh-4",
          "helmet": "student-hat",
          "outerwear": "student-jacket",
          "pants": "student-shorts",
          "shoes": "student-long-socks-shoes"
        },
        "rarity": "N"
      },
      {
        "id": "blue-worker-suit",
        "name": "蓝色工人套装",
        "icon": "character/upstream/svg/blue-worker-suit.svg",
        "pieces": {
          "skin": "flesh-3",
          "helmet": "white-worker-helmet",
          "outerwear": "blue-worker-jacket",
          "pants": "blue-worker-trousers",
          "shoes": "gray-worker-boots"
        },
        "rarity": "N"
      },
      {
        "id": "worker-suit",
        "name": "橙色工人套装",
        "icon": "character/upstream/svg/worker-suit.svg",
        "pieces": {
          "skin": "flesh-3",
          "helmet": "worker-helmet",
          "outerwear": "worker-jacket",
          "pants": "worker-trousers",
          "shoes": "worker-boots"
        },
        "rarity": "N"
      },
      {
        "id": "kappa-suit",
        "name": "河童套装",
        "icon": "character/upstream/svg/kappa-suit.svg",
        "pieces": {
          "skin": "kappa",
          "helmet": "kappa-hair",
          "cape": "kappa-shell"
        },
        "rarity": "R"
      },
      {
        "id": "jobs-suit",
        "name": "乔布斯套装",
        "icon": "character/upstream/svg/jobs-suit.svg",
        "pieces": {
          "skin": "flesh-2",
          "helmet": "round-glasses",
          "shirt": "black-turtleneck-tee",
          "pants": "jobs-gradient-jeans",
          "shoes": "gray-sneakers"
        },
        "rarity": "R"
      },
      {
        "id": "clown-suit",
        "name": "小丑鱼人套装",
        "icon": "character/upstream/svg/clown-suit.svg",
        "pieces": {
          "skin": "clown",
          "helmet": "party-hat"
        },
        "rarity": "R"
      },
      {
        "id": "shark-suit",
        "name": "鲨鱼人套装",
        "icon": "character/upstream/svg/shark-suit.svg",
        "pieces": {
          "skin": "flesh",
          "helmet": "shark-hood",
          "pants": "black-shorts"
        },
        "rarity": "R"
      },
      {
        "id": "ivory-suit",
        "name": "金色国王套装",
        "icon": "character/upstream/svg/ivory-suit.svg",
        "pieces": {
          "skin": "yellow-color-skin",
          "helmet": "gold-crown",
          "shirt": "ivory-tunic",
          "pants": "white-loose-wide-trousers",
          "shoes": "dark-boots",
          "cape": "crimson-cape"
        },
        "rarity": "SR"
      },
      {
        "id": "navy-suit",
        "name": "藏蓝西装套装",
        "icon": "character/upstream/svg/navy-suit.svg",
        "pieces": {
          "skin": "flesh",
          "outerwear": "suit-jacket",
          "pants": "suit-trousers",
          "shoes": "black-dress-shoes"
        },
        "rarity": "N"
      }
    ]
  },
  {
    "id": "skin",
    "name": "皮肤",
    "items": [
      {
        "id": "tears-cyan",
        "name": "青蓝泪珠皮肤",
        "icon": "character/upstream/svg/tears-cyan.svg",
        "rarity": "R"
      },
      {
        "id": "tears-lime",
        "name": "浅绿泪珠皮肤",
        "icon": "character/upstream/svg/tears-lime.svg",
        "rarity": "R"
      },
      {
        "id": "tears-green",
        "name": "草绿泪珠皮肤",
        "icon": "character/upstream/svg/tears-green.svg",
        "rarity": "R"
      },
      {
        "id": "monkey",
        "name": "猴子皮肤",
        "icon": "character/upstream/svg/monkey-skin.svg",
        "rarity": "R"
      },
      {
        "id": "gyaru",
        "name": "辣妹皮肤",
        "icon": "character/upstream/svg/gyaru-skin.svg",
        "rarity": "R"
      },
      {
        "id": "sponge",
        "name": "海绵皮肤",
        "icon": "character/upstream/svg/sponge-skin.svg",
        "rarity": "R"
      },
      {
        "id": "blue-color-skin",
        "name": "蓝色皮肤",
        "icon": "character/upstream/svg/blue-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "cyan-color-skin",
        "name": "亮蓝色皮肤",
        "icon": "character/upstream/svg/cyan-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "red-color-skin",
        "name": "红色皮肤",
        "icon": "character/upstream/svg/red-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "orange-color-skin",
        "name": "橙色皮肤",
        "icon": "character/upstream/svg/orange-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "yellow-color-skin",
        "name": "黄色皮肤",
        "icon": "character/upstream/svg/yellow-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "purple-color-skin",
        "name": "紫色皮肤",
        "icon": "character/upstream/svg/purple-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "olive-color-skin",
        "name": "黄绿色皮肤",
        "icon": "character/upstream/svg/olive-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "green-color-skin",
        "name": "绿色皮肤",
        "icon": "character/upstream/svg/green-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "pink-color-skin",
        "name": "粉色皮肤",
        "icon": "character/upstream/svg/pink-color-skin.svg",
        "rarity": "N"
      },
      {
        "id": "rainbow-color-skin",
        "name": "渐变彩色皮肤",
        "icon": "character/upstream/svg/rainbow-color-skin.svg",
        "rarity": "SR"
      },
      {
        "id": "scar",
        "name": "刀疤皮肤",
        "icon": "character/upstream/svg/scar.svg",
        "rarity": "N"
      },
      {
        "id": "lipstick-fish",
        "name": "口红鱼皮肤",
        "icon": "character/upstream/svg/lipstick-fish.svg",
        "rarity": "R"
      },
      {
        "id": "flesh-8",
        "name": "肉色皮肤8",
        "icon": "character/upstream/svg/flesh-8.svg",
        "rarity": "N"
      },
      {
        "id": "flesh-7",
        "name": "肉色皮肤7",
        "icon": "character/upstream/svg/flesh-7.svg",
        "rarity": "N"
      },
      {
        "id": "muscle-tan",
        "name": "肉色5肌肉皮肤",
        "icon": "character/upstream/svg/muscle-tan.svg",
        "rarity": "R"
      },
      {
        "id": "muscle-white",
        "name": "白皙肌肉皮肤",
        "icon": "character/upstream/svg/muscle-white.svg",
        "rarity": "R"
      },
      {
        "id": "muscle-gray",
        "name": "灰色肌肉皮肤",
        "icon": "character/upstream/svg/muscle-gray.svg",
        "rarity": "R"
      },
      {
        "id": "muscle",
        "name": "肉色肌肉皮肤",
        "icon": "character/upstream/svg/muscle-skin.svg",
        "rarity": "R"
      },
      {
        "id": "flesh-6",
        "name": "肉色皮肤6",
        "icon": "character/upstream/svg/flesh-6.svg",
        "rarity": "N"
      },
      {
        "id": "hypnotic",
        "name": "迷幻眼皮肤",
        "icon": "character/upstream/svg/hypnotic.svg",
        "rarity": "SR"
      },
      {
        "id": "flesh-5",
        "name": "肉色皮肤5",
        "icon": "character/upstream/svg/flesh-5.svg",
        "rarity": "N"
      },
      {
        "id": "flesh-4",
        "name": "肉色皮肤4",
        "icon": "character/upstream/svg/flesh-4.svg",
        "rarity": "N"
      },
      {
        "id": "little-yellow-fish",
        "name": "小黄鱼皮肤",
        "icon": "character/upstream/svg/little-yellow-fish.svg",
        "rarity": "N"
      },
      {
        "id": "flesh-3",
        "name": "肉色皮肤3",
        "icon": "character/upstream/svg/flesh-3.svg",
        "rarity": "N"
      },
      {
        "id": "kappa",
        "name": "河童皮肤",
        "icon": "character/upstream/svg/kappa.svg",
        "rarity": "R"
      },
      {
        "id": "flesh-2",
        "name": "肉色皮肤2",
        "icon": "character/upstream/svg/flesh-2.svg",
        "rarity": "N"
      },
      {
        "id": "milk-frog",
        "name": "奶鱼",
        "icon": "character/upstream/svg/milk-frog.svg",
        "rarity": "N"
      },
      {
        "id": "pochita",
        "name": "大眼睛皮肤",
        "icon": "character/upstream/svg/pochita.svg",
        "rarity": "N"
      },
      {
        "id": "flesh",
        "name": "肉色皮肤1",
        "icon": "character/upstream/svg/flesh-skin.svg",
        "rarity": "N"
      },
      {
        "id": "clown",
        "name": "小丑皮肤",
        "icon": "character/upstream/svg/clown-skin.svg",
        "rarity": "R"
      },
      {
        "id": "alien",
        "name": "外星皮肤",
        "icon": "character/upstream/svg/alien-skin.svg",
        "rarity": "R"
      }
    ]
  },
  {
    "id": "helmet",
    "name": "帽子",
    "items": [
      {
        "id": "triangle-straw-hat",
        "name": "三角草帽",
        "icon": "character/upstream/svg/triangle-straw-hat.svg",
        "rarity": "N"
      },
      {
        "id": "ninja-hood",
        "name": "忍者兜帽",
        "icon": "character/upstream/svg/ninja-hood.svg",
        "rarity": "R"
      },
      {
        "id": "lotus-hat",
        "name": "莲花帽",
        "icon": "character/upstream/svg/lotus-hat.svg",
        "rarity": "R"
      },
      {
        "id": "golden-circlet",
        "name": "金箍",
        "icon": "character/upstream/svg/golden-circlet.svg",
        "rarity": "SR"
      },
      {
        "id": "chef-hat",
        "name": "白色厨师帽",
        "icon": "character/upstream/svg/chef-hat.svg",
        "rarity": "N"
      },
      {
        "id": "yellow-bow-hair",
        "name": "黄色蝴蝶结发型",
        "icon": "character/upstream/svg/yellow-bow-hair.svg",
        "rarity": "N"
      },
      {
        "id": "red-baseball-cap",
        "name": "红色鸭舌帽",
        "icon": "character/upstream/svg/red-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "blue-baseball-cap",
        "name": "蓝色鸭舌帽",
        "icon": "character/upstream/svg/blue-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "green-baseball-cap",
        "name": "绿色鸭舌帽",
        "icon": "character/upstream/svg/green-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "black-baseball-cap",
        "name": "黑色鸭舌帽",
        "icon": "character/upstream/svg/black-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "yellow-baseball-cap",
        "name": "黄色鸭舌帽",
        "icon": "character/upstream/svg/yellow-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "white-baseball-cap",
        "name": "白色鸭舌帽",
        "icon": "character/upstream/svg/white-baseball-cap.svg",
        "rarity": "N"
      },
      {
        "id": "blue-diving-goggles",
        "name": "蓝色潜水镜",
        "icon": "character/upstream/svg/blue-diving-goggles.svg",
        "rarity": "N"
      },
      {
        "id": "pink-diving-goggles",
        "name": "粉红色潜水镜",
        "icon": "character/upstream/svg/pink-diving-goggles.svg",
        "rarity": "N"
      },
      {
        "id": "blue-eye-band",
        "name": "蓝色眼带",
        "icon": "character/upstream/svg/blue-eye-band.svg",
        "rarity": "N"
      },
      {
        "id": "red-eye-band",
        "name": "红色眼带",
        "icon": "character/upstream/svg/red-eye-band.svg",
        "rarity": "N"
      },
      {
        "id": "black-eye-band",
        "name": "黑色眼带",
        "icon": "character/upstream/svg/black-eye-band.svg",
        "rarity": "N"
      },
      {
        "id": "teardrop-earrings",
        "name": "水滴耳环",
        "icon": "character/upstream/svg/teardrop-earrings.svg",
        "rarity": "N"
      },
      {
        "id": "pink-ribbon-hair",
        "name": "粉红色飘带发型",
        "icon": "character/upstream/svg/pink-ribbon-hair.svg",
        "rarity": "N"
      },
      {
        "id": "angel-halo",
        "name": "天使光环",
        "icon": "character/upstream/svg/angel-halo.svg",
        "rarity": "SR"
      },
      {
        "id": "yellow-spiky-hair",
        "name": "黄色刺猬头",
        "icon": "character/upstream/svg/yellow-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "purple-spiky-hair",
        "name": "紫色刺猬头",
        "icon": "character/upstream/svg/purple-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "blue-spiky-hair",
        "name": "蓝色刺猬头",
        "icon": "character/upstream/svg/blue-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "red-spiky-hair",
        "name": "红色刺猬头",
        "icon": "character/upstream/svg/red-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "black-spiky-hair",
        "name": "黑色刺猬头",
        "icon": "character/upstream/svg/black-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "white-spiky-hair",
        "name": "白色刺猬头",
        "icon": "character/upstream/svg/white-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "green-spiky-hair",
        "name": "绿色刺猬头",
        "icon": "character/upstream/svg/green-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "pink-spiky-hair",
        "name": "粉色刺猬头",
        "icon": "character/upstream/svg/pink-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "orange-spiky-hair",
        "name": "橙色刺猬头",
        "icon": "character/upstream/svg/orange-spiky-hair.svg",
        "rarity": "N"
      },
      {
        "id": "space-helmet",
        "name": "宇航员头盔",
        "icon": "character/upstream/svg/space-helmet.svg",
        "rarity": "R"
      },
      {
        "id": "topknot-hair",
        "name": "深蓝色小辫头",
        "icon": "character/upstream/svg/topknot-hair.svg",
        "rarity": "N"
      },
      {
        "id": "white-topknot-hair",
        "name": "白色小辫头",
        "icon": "character/upstream/svg/white-topknot-hair.svg",
        "rarity": "N"
      },
      {
        "id": "green-topknot-hair",
        "name": "绿色小辫头",
        "icon": "character/upstream/svg/green-topknot-hair.svg",
        "rarity": "N"
      },
      {
        "id": "long-braid-hair",
        "name": "红色长辫发",
        "icon": "character/upstream/svg/long-braid-hair.svg",
        "rarity": "N"
      },
      {
        "id": "black-long-braid-hair",
        "name": "黑色长辫发",
        "icon": "character/upstream/svg/black-long-braid-hair.svg",
        "rarity": "N"
      },
      {
        "id": "white-long-braid-hair",
        "name": "白色长辫发",
        "icon": "character/upstream/svg/white-long-braid-hair.svg",
        "rarity": "N"
      },
      {
        "id": "secondary-hat",
        "name": "中学生帽子",
        "icon": "character/upstream/svg/secondary-hat.svg",
        "rarity": "N"
      },
      {
        "id": "student-hat",
        "name": "小学生帽子",
        "icon": "character/upstream/svg/student-hat.svg",
        "rarity": "N"
      },
      {
        "id": "white-worker-helmet",
        "name": "白色工人安全帽",
        "icon": "character/upstream/svg/white-worker-helmet.svg",
        "rarity": "N"
      },
      {
        "id": "worker-helmet",
        "name": "黄色工人安全帽",
        "icon": "character/upstream/svg/worker-helmet.svg",
        "rarity": "N"
      },
      {
        "id": "kappa-hair",
        "name": "河童发型",
        "icon": "character/upstream/svg/kappa-hair.svg",
        "rarity": "R"
      },
      {
        "id": "round-glasses",
        "name": "棕框眼镜",
        "icon": "character/upstream/svg/round-glasses.svg",
        "rarity": "N"
      },
      {
        "id": "party-hat",
        "name": "派对帽",
        "icon": "character/upstream/svg/party-hat.svg",
        "rarity": "N"
      },
      {
        "id": "large-party-hat",
        "name": "大派对帽",
        "icon": "character/upstream/svg/large-party-hat.svg",
        "rarity": "N"
      },
      {
        "id": "shark-hood",
        "name": "鲨鱼头套",
        "icon": "character/upstream/svg/shark-hood.svg",
        "rarity": "R"
      },
      {
        "id": "chainsaw",
        "name": "电锯头盔",
        "icon": "character/upstream/svg/chainsaw.svg",
        "rarity": "R"
      },
      {
        "id": "batfish-cowl",
        "name": "尖耳头罩",
        "icon": "character/upstream/svg/batfish-cowl.svg",
        "rarity": "R"
      },
      {
        "id": "plain",
        "name": "氧气头盔",
        "icon": "character/upstream/svg/toukui.svg",
        "rarity": "N"
      },
      {
        "id": "yellow-hat",
        "name": "黄色宽檐帽",
        "icon": "character/upstream/svg/yellow-hat.svg",
        "rarity": "N"
      },
      {
        "id": "gold-crown",
        "name": "金色皇冠",
        "icon": "character/upstream/svg/gold-crown.svg",
        "rarity": "SR"
      }
    ]
  },
  {
    "id": "neck",
    "name": "颈部",
    "items": [
      {
        "id": "small-red-scarf",
        "name": "深红小围脖",
        "icon": "character/upstream/svg/small-red-scarf.svg",
        "rarity": "N"
      },
      {
        "id": "prayer-beads",
        "name": "佛珠项链",
        "icon": "character/upstream/svg/prayer-beads.svg",
        "rarity": "R"
      },
      {
        "id": "small-blue-scarf",
        "name": "小蓝围脖",
        "icon": "character/upstream/svg/small-blue-scarf.svg",
        "rarity": "N"
      },
      {
        "id": "cigarette",
        "name": "叼烟",
        "icon": "character/upstream/svg/cigarette.svg",
        "rarity": "N"
      },
      {
        "id": "scarf",
        "name": "红围巾",
        "icon": "character/upstream/svg/decoration-scarf.svg",
        "rarity": "N"
      }
    ]
  },
  {
    "id": "shirt",
    "name": "上衣",
    "items": [
      {
        "id": "pink-heart-bra",
        "name": "粉色心心内衣",
        "icon": "character/upstream/svg/pink-heart-bra.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "gray-scoop-tee",
        "name": "灰色深圆领弧摆短袖",
        "icon": "character/upstream/svg/gray-scoop-tee.svg",
        "rarity": "N"
      },
      {
        "id": "shell-top",
        "name": "白色贝壳上衣",
        "icon": "character/upstream/svg/shell-top.svg",
        "sleeveless": true,
        "rarity": "R"
      },
      {
        "id": "mosaic-top",
        "name": "马赛克上衣",
        "icon": "character/upstream/svg/mosaic-top.svg",
        "rarity": "R"
      },
      {
        "id": "angel-vest",
        "name": "天使配色无袖背心",
        "icon": "character/upstream/svg/angel-vest.svg",
        "sleeveless": true,
        "rarity": "R"
      },
      {
        "id": "white-tie-shirt",
        "name": "白色衬衫",
        "icon": "character/upstream/svg/white-tie-shirt.svg",
        "rarity": "N"
      },
      {
        "id": "black-turtleneck-tee",
        "name": "高领黑色半袖",
        "icon": "character/upstream/svg/black-turtleneck-tee.svg",
        "rarity": "N"
      },
      {
        "id": "batfish-armor",
        "name": "鱼徽战衣",
        "icon": "character/upstream/svg/batfish-armor.svg",
        "rarity": "R"
      },
      {
        "id": "ivory-tunic",
        "name": "白金束腰阔袖上衣",
        "icon": "character/upstream/svg/ivory-tunic.svg",
        "rarity": "SR"
      },
      {
        "id": "plain",
        "name": "普通长袖上衣",
        "icon": "character/upstream/svg/decoration-shirt.svg",
        "rarity": "N"
      },
      {
        "id": "blue-vest",
        "name": "蓝色 V 领背心",
        "icon": "character/upstream/svg/blue-vest.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "yellow-tee",
        "name": "黄色宽松短袖",
        "icon": "character/upstream/svg/yellow-tee.svg",
        "rarity": "N"
      },
      {
        "id": "patched-tee",
        "name": "补丁短袖",
        "icon": "character/upstream/svg/patched-tee.svg",
        "rarity": "N"
      },
      {
        "id": "red-triangle",
        "name": "红色三角衣服",
        "icon": "character/upstream/svg/red-triangle.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "coral-tee",
        "name": "红色短款短袖",
        "icon": "character/upstream/svg/coral-tee.svg",
        "rarity": "N"
      },
      {
        "id": "red-cropped-tee-2",
        "name": "红色短款短袖2",
        "icon": "character/upstream/svg/red-cropped-tee-2.svg",
        "rarity": "N"
      },
      {
        "id": "black-cropped-tee",
        "name": "黑色短款短袖",
        "icon": "character/upstream/svg/black-cropped-tee.svg",
        "rarity": "N"
      },
      {
        "id": "loose-tee",
        "name": "宽松T恤",
        "icon": "character/upstream/svg/loose-tee.svg",
        "rarity": "N"
      },
      {
        "id": "loose-long-sleeve",
        "name": "宽松长袖上衣",
        "icon": "character/upstream/svg/loose-long-sleeve.svg",
        "rarity": "N"
      },
      {
        "id": "cinched-long-sleeve",
        "name": "收口宽松长袖",
        "icon": "character/upstream/svg/cinched-long-sleeve.svg",
        "rarity": "N"
      }
    ]
  },
  {
    "id": "pants",
    "name": "裤子",
    "items": [
      {
        "id": "black-red-sweatpants",
        "name": "黑红宽松卫裤",
        "icon": "character/upstream/svg/black-red-sweatpants.svg",
        "rarity": "N"
      },
      {
        "id": "ninja-sweatpants",
        "name": "深蓝拼黑宽松卫裤",
        "icon": "character/upstream/svg/ninja-sweatpants.svg",
        "rarity": "N"
      },
      {
        "id": "white-sweatpants",
        "name": "白色拼白宽松卫裤",
        "icon": "character/upstream/svg/white-sweatpants.svg",
        "rarity": "N"
      },
      {
        "id": "walker-sweatpants",
        "name": "橙棕行者卫裤",
        "icon": "character/upstream/svg/walker-sweatpants.svg",
        "rarity": "N"
      },
      {
        "id": "black-gray-sweatpants",
        "name": "黑灰宽松卫裤",
        "icon": "character/upstream/svg/black-gray-sweatpants.svg",
        "rarity": "N"
      },
      {
        "id": "mosaic-pants",
        "name": "马赛克裤子",
        "icon": "character/upstream/svg/mosaic-pants.svg",
        "rarity": "R"
      },
      {
        "id": "white-loose-wide-trousers",
        "name": "白色超阔长裤",
        "icon": "character/upstream/svg/white-loose-wide-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "space-trousers",
        "name": "宇航配色宽松卫裤",
        "icon": "character/upstream/svg/space-trousers.svg",
        "rarity": "R"
      },
      {
        "id": "dark-gray-slight-wide-trousers",
        "name": "深灰色微阔长裤",
        "icon": "character/upstream/svg/dark-gray-slight-wide-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "black-slight-wide-trousers",
        "name": "黑色微阔长裤",
        "icon": "character/upstream/svg/black-slight-wide-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "green-ultra-shorts",
        "name": "绿色微阔超短裤",
        "icon": "character/upstream/svg/green-ultra-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "student-shorts",
        "name": "藏蓝小学生短裤",
        "icon": "character/upstream/svg/student-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "blue-worker-trousers",
        "name": "深蓝工人裤",
        "icon": "character/upstream/svg/blue-worker-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "worker-trousers",
        "name": "橙色工人裤",
        "icon": "character/upstream/svg/worker-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "batfish-trousers",
        "name": "深灰战裤",
        "icon": "character/upstream/svg/batfish-trousers.svg",
        "rarity": "R"
      },
      {
        "id": "royal-trousers",
        "name": "国王白长裤",
        "icon": "character/upstream/svg/royal-trousers.svg",
        "rarity": "R"
      },
      {
        "id": "suit-trousers",
        "name": "藏蓝西装长裤",
        "icon": "character/upstream/svg/suit-trousers.svg",
        "rarity": "N"
      },
      {
        "id": "plain",
        "name": "紧身裤",
        "icon": "character/upstream/svg/decoration-pants.svg",
        "rarity": "N"
      },
      {
        "id": "jumpsuit",
        "name": "蓝色连体裤",
        "icon": "character/upstream/svg/decoration-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "navy-jumpsuit",
        "name": "深蓝色连体裤",
        "icon": "character/upstream/svg/navy-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "pink-polka-boxers",
        "name": "粉色波点四角内裤",
        "icon": "character/upstream/svg/pink-polka-boxers.svg",
        "rarity": "N"
      },
      {
        "id": "red-shorts",
        "name": "红色四角内裤",
        "icon": "character/upstream/svg/red-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "white-boxers",
        "name": "白色四角内裤",
        "icon": "character/upstream/svg/white-boxers.svg",
        "rarity": "N"
      },
      {
        "id": "black-boxers",
        "name": "黑色四角内裤",
        "icon": "character/upstream/svg/black-boxers.svg",
        "rarity": "N"
      },
      {
        "id": "red-briefs",
        "name": "红色三角内裤",
        "icon": "character/upstream/svg/red-briefs.svg",
        "rarity": "N"
      },
      {
        "id": "white-briefs",
        "name": "白色三角内裤",
        "icon": "character/upstream/svg/white-briefs.svg",
        "rarity": "N"
      },
      {
        "id": "black-briefs",
        "name": "黑色三角内裤",
        "icon": "character/upstream/svg/black-briefs.svg",
        "rarity": "N"
      },
      {
        "id": "pink-shorts",
        "name": "粉色短裤",
        "icon": "character/upstream/svg/pink-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "orange-shorts",
        "name": "橙色短裤",
        "icon": "character/upstream/svg/orange-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "black-shorts",
        "name": "黑色短裤",
        "icon": "character/upstream/svg/black-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "slight-wide-shorts",
        "name": "灰青色微阔短裤",
        "icon": "character/upstream/svg/slight-wide-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "extra-wide-shorts",
        "name": "灰青色阔腿短裤",
        "icon": "character/upstream/svg/extra-wide-shorts.svg",
        "rarity": "N"
      },
      {
        "id": "red-thong",
        "name": "红色丁字裤",
        "icon": "character/upstream/svg/red-thong.svg",
        "rarity": "N"
      },
      {
        "id": "green-thong",
        "name": "绿色丁字裤",
        "icon": "character/upstream/svg/green-thong.svg",
        "rarity": "N"
      },
      {
        "id": "purple-thong",
        "name": "紫色丁字裤",
        "icon": "character/upstream/svg/purple-thong.svg",
        "rarity": "N"
      },
      {
        "id": "white-thong",
        "name": "白色丁字裤",
        "icon": "character/upstream/svg/white-thong.svg",
        "rarity": "N"
      },
      {
        "id": "black-thong",
        "name": "黑色丁字裤",
        "icon": "character/upstream/svg/black-thong.svg",
        "rarity": "N"
      },
      {
        "id": "denim-jeans",
        "name": "牛仔蓝普通牛仔裤",
        "icon": "character/upstream/svg/denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "washed-denim-jeans",
        "name": "牛仔蓝水洗牛仔裤",
        "icon": "character/upstream/svg/washed-denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "light-denim-jeans",
        "name": "浅牛仔蓝普通牛仔裤",
        "icon": "character/upstream/svg/light-denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "light-ripped-denim-jeans",
        "name": "浅牛仔蓝小破洞牛仔裤",
        "icon": "character/upstream/svg/light-ripped-denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "dark-denim-jeans",
        "name": "深牛仔蓝普通牛仔裤",
        "icon": "character/upstream/svg/dark-denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "dark-large-ripped-denim-jeans",
        "name": "深牛仔蓝大破洞牛仔裤",
        "icon": "character/upstream/svg/dark-large-ripped-denim-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "jobs-gradient-jeans",
        "name": "渐变牛仔",
        "icon": "character/upstream/svg/jobs-gradient-jeans.svg",
        "rarity": "N"
      },
      {
        "id": "denim-jumpsuit",
        "name": "牛仔蓝连体工装裤",
        "icon": "character/upstream/svg/denim-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "light-denim-jumpsuit",
        "name": "浅牛仔蓝连体工装裤",
        "icon": "character/upstream/svg/light-denim-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "dark-denim-jumpsuit",
        "name": "深牛仔蓝连体工装裤",
        "icon": "character/upstream/svg/dark-denim-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "orange-jumpsuit",
        "name": "橙色连体工装裤",
        "icon": "character/upstream/svg/orange-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "pink-jumpsuit",
        "name": "粉红色连体工装裤",
        "icon": "character/upstream/svg/pink-jumpsuit.svg",
        "sleeveless": true,
        "rarity": "N"
      },
      {
        "id": "loose-wide-pants",
        "name": "几何拼贴阔腿裤",
        "icon": "character/upstream/svg/loose-wide-pants.svg",
        "rarity": "N"
      }
    ]
  },
  {
    "id": "outerwear",
    "name": "外套",
    "items": [
      {
        "id": "drink-cup",
        "name": "饮料杯外套",
        "icon": "character/upstream/svg/drink-cup.svg",
        "sleeveless": true,
        "rarity": "R"
      },
      {
        "id": "ronin-shirt",
        "name": "深蓝行者外套",
        "icon": "character/upstream/svg/ronin-shirt.svg",
        "rarity": "R"
      },
      {
        "id": "ninja-shirt",
        "name": "忍者上衣",
        "icon": "character/upstream/svg/ninja-shirt.svg",
        "rarity": "R"
      },
      {
        "id": "monk-robe",
        "name": "袈裟上衣",
        "icon": "character/upstream/svg/monk-robe.svg",
        "rarity": "R"
      },
      {
        "id": "walker-shirt",
        "name": "行者上衣",
        "icon": "character/upstream/svg/walker-shirt.svg",
        "rarity": "R"
      },
      {
        "id": "white-chef-jacket",
        "name": "白色厨师上衣",
        "icon": "character/upstream/svg/white-chef-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "duck-swim-ring",
        "name": "黄鸭子游泳圈",
        "icon": "character/upstream/svg/duck-swim-ring.svg",
        "rarity": "N"
      },
      {
        "id": "pink-striped-swim-ring",
        "name": "粉色条纹游泳圈",
        "icon": "character/upstream/svg/pink-striped-swim-ring.svg",
        "rarity": "N"
      },
      {
        "id": "red-white-swim-ring",
        "name": "红白条纹游泳圈",
        "icon": "character/upstream/svg/red-white-swim-ring.svg",
        "rarity": "N"
      },
      {
        "id": "sheer-blue-striped-swim-ring",
        "name": "蓝色半透明条纹游泳圈",
        "icon": "character/upstream/svg/sheer-blue-striped-swim-ring.svg",
        "rarity": "R"
      },
      {
        "id": "sheer-pink-swim-ring",
        "name": "粉色半透明游泳圈",
        "icon": "character/upstream/svg/sheer-pink-swim-ring.svg",
        "rarity": "R"
      },
      {
        "id": "space-shirt",
        "name": "宇航配色宽松卫衣",
        "icon": "character/upstream/svg/space-shirt.svg",
        "rarity": "R"
      },
      {
        "id": "charcoal-blazer",
        "name": "深灰西装外套",
        "icon": "character/upstream/svg/charcoal-blazer.svg",
        "rarity": "N"
      },
      {
        "id": "secondary-jacket",
        "name": "中学生外套",
        "icon": "character/upstream/svg/secondary-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "student-jacket",
        "name": "小学生外套",
        "icon": "character/upstream/svg/student-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "blue-worker-jacket",
        "name": "深蓝反光工人外套",
        "icon": "character/upstream/svg/blue-worker-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "worker-jacket",
        "name": "橙色反光工人外套",
        "icon": "character/upstream/svg/worker-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "suit-jacket",
        "name": "藏蓝西装上衣",
        "icon": "character/upstream/svg/suit-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "aloha-jacket",
        "name": "藏蓝短袖外套",
        "icon": "character/upstream/svg/aloha-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "aloha-long-jacket",
        "name": "藏蓝长袖外套",
        "icon": "character/upstream/svg/aloha-long-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "aloha-open-jacket",
        "name": "藏蓝敞胸短袖外套",
        "icon": "character/upstream/svg/aloha-open-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "aloha-open-long-jacket",
        "name": "藏蓝敞胸长袖外套",
        "icon": "character/upstream/svg/aloha-open-long-jacket.svg",
        "rarity": "N"
      },
      {
        "id": "green-vest",
        "name": "绿色开襟外套",
        "icon": "character/upstream/svg/green-vest.svg",
        "sleeveless": true,
        "rarity": "N"
      }
    ]
  },
  {
    "id": "shoes",
    "name": "鞋子",
    "items": [
      {
        "id": "ninja-worker-boots",
        "name": "束带宽筒长靴",
        "icon": "character/upstream/svg/ninja-worker-boots.svg",
        "rarity": "R"
      },
      {
        "id": "gray-plain-shoes",
        "name": "灰色普通鞋",
        "icon": "character/upstream/svg/gray-plain-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "brown-worker-boots",
        "name": "棕色宽筒长靴",
        "icon": "character/upstream/svg/brown-worker-boots.svg",
        "rarity": "N"
      },
      {
        "id": "navy-slippers",
        "name": "深蓝色拖鞋",
        "icon": "character/upstream/svg/navy-slippers.svg",
        "rarity": "N"
      },
      {
        "id": "navy-sandals",
        "name": "深蓝色凉鞋",
        "icon": "character/upstream/svg/navy-sandals.svg",
        "rarity": "N"
      },
      {
        "id": "orange-shoes",
        "name": "橙色普通鞋",
        "icon": "character/upstream/svg/orange-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "colorblock-shoes",
        "name": "灰蓝拼色鞋",
        "icon": "character/upstream/svg/colorblock-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "brown-shoes",
        "name": "棕色普通鞋",
        "icon": "character/upstream/svg/brown-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "student-long-socks-shoes",
        "name": "黑鞋长白袜",
        "icon": "character/upstream/svg/student-long-socks-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "tricolor-long-socks-shoes",
        "name": "黑鞋三色横条长袜",
        "icon": "character/upstream/svg/tricolor-long-socks-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "striped-long-socks-shoes",
        "name": "黑鞋黑白条纹长袜",
        "icon": "character/upstream/svg/striped-long-socks-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "student-shoes",
        "name": "黑鞋短白袜",
        "icon": "character/upstream/svg/student-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "black-worker-boots",
        "name": "黑色宽筒长靴",
        "icon": "character/upstream/svg/black-worker-boots.svg",
        "rarity": "N"
      },
      {
        "id": "blue-worker-boots",
        "name": "蓝色宽筒长靴",
        "icon": "character/upstream/svg/blue-worker-boots.svg",
        "rarity": "N"
      },
      {
        "id": "gray-worker-boots",
        "name": "灰色宽筒长靴",
        "icon": "character/upstream/svg/gray-worker-boots.svg",
        "rarity": "N"
      },
      {
        "id": "worker-boots",
        "name": "黄色宽筒长靴",
        "icon": "character/upstream/svg/worker-boots.svg",
        "rarity": "N"
      },
      {
        "id": "gray-sneakers",
        "name": "灰色系带休闲鞋",
        "icon": "character/upstream/svg/gray-sneakers.svg",
        "rarity": "N"
      },
      {
        "id": "batfish-boots",
        "name": "黑色战靴",
        "icon": "character/upstream/svg/batfish-boots.svg",
        "rarity": "R"
      },
      {
        "id": "black-dress-shoes",
        "name": "黑皮鞋",
        "icon": "character/upstream/svg/black-dress-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "plain",
        "name": "普通鞋子",
        "icon": "character/upstream/svg/decoration-shoes.svg",
        "rarity": "N"
      },
      {
        "id": "brown-boots",
        "name": "棕色长靴",
        "icon": "character/upstream/svg/brown-boots.svg",
        "rarity": "N"
      },
      {
        "id": "dark-boots",
        "name": "深棕色长靴",
        "icon": "character/upstream/svg/dark-boots.svg",
        "rarity": "N"
      }
    ]
  },
  {
    "id": "cape",
    "name": "披风",
    "items": [
      {
        "id": "gourd",
        "name": "葫芦",
        "icon": "character/upstream/svg/gourd.svg",
        "rarity": "R"
      },
      {
        "id": "paired-swords",
        "name": "佩剑",
        "icon": "character/upstream/svg/paired-swords.svg",
        "rarity": "R"
      },
      {
        "id": "angel-wings",
        "name": "白色天使翅膀",
        "icon": "character/upstream/svg/angel-wings.svg",
        "rarity": "SR"
      },
      {
        "id": "dual-swords",
        "name": "双刀",
        "icon": "character/upstream/svg/dual-swords.svg",
        "rarity": "R"
      },
      {
        "id": "greatsword",
        "name": "大剑",
        "icon": "character/upstream/svg/greatsword.svg",
        "rarity": "SR"
      },
      {
        "id": "kappa-shell",
        "name": "河童龟壳",
        "icon": "character/upstream/svg/kappa-shell.svg",
        "rarity": "R"
      },
      {
        "id": "crimson-cape",
        "name": "绯红披风",
        "icon": "character/upstream/svg/crimson-cape.svg",
        "rarity": "R"
      },
      {
        "id": "charcoal-cape",
        "name": "漆黑披风",
        "icon": "character/upstream/svg/charcoal-cape.svg",
        "rarity": "R"
      },
      {
        "id": "azure-cape",
        "name": "湛蓝披风",
        "icon": "character/upstream/svg/azure-cape.svg",
        "rarity": "R"
      },
      {
        "id": "solid-gold-cape",
        "name": "纯色金披风",
        "icon": "character/upstream/svg/solid-gold-cape.svg",
        "rarity": "N"
      },
      {
        "id": "solid-red-cape",
        "name": "纯色红披风",
        "icon": "character/upstream/svg/solid-red-cape.svg",
        "rarity": "N"
      },
      {
        "id": "solid-blue-cape",
        "name": "纯色蓝披风",
        "icon": "character/upstream/svg/solid-blue-cape.svg",
        "rarity": "N"
      },
      {
        "id": "solid-black-cape",
        "name": "纯色黑披风",
        "icon": "character/upstream/svg/solid-black-cape.svg",
        "rarity": "N"
      }
    ]
  },
  {
    "id": "gloves",
    "name": "手套",
    "items": [
      {
        "id": "space-gloves",
        "name": "橙色宇航手套",
        "icon": "character/upstream/svg/space-gloves.svg",
        "rarity": "R"
      },
      {
        "id": "batfish-gloves",
        "name": "黑色手套",
        "icon": "character/upstream/svg/batfish-gloves.svg",
        "rarity": "N"
      },
      {
        "id": "plain",
        "name": "普通手套",
        "icon": "character/upstream/svg/decoration-gloves.svg",
        "rarity": "N"
      }
    ]
  }
];

// Permanent cosmetic collection is independent of the farm's per-run economy.
const WARDROBE_COLLECTION_KEY='sea-game-wardrobe-collection-v1';
const WARDROBE_PENDING_KEY='sea-game-wardrobe-pending-v1';
const WARDROBE_STARTERS=['skin:milk-frog','helmet:triangle-straw-hat','shirt:plain','pants:plain','shoes:plain'];
const wardrobeCatalogByKey=new Map(WARDROBE_CATEGORIES.flatMap(group=>group.items.map(item=>[group.id+':'+item.id,{...item,category:group.id}])));
function readWardrobeCollection(){
 try{const data=JSON.parse(localStorage.getItem(WARDROBE_COLLECTION_KEY));return Array.isArray(data?.owned)?data.owned.filter(key=>wardrobeCatalogByKey.has(key)):[]}catch{return []}
}
function expandWardrobeUnlocks(keys){
 const expanded=new Set(keys.filter(key=>wardrobeCatalogByKey.has(key)));
 for(const key of [...expanded]){
  const item=wardrobeCatalogByKey.get(key);
  if(item.category==='suit')for(const [category,id] of Object.entries(item.pieces||{})){
   const pieceKey=category+':'+id;if(wardrobeCatalogByKey.has(pieceKey))expanded.add(pieceKey);
  }
 }
 return [...expanded];
}
function hydrateWardrobeCollection(){
 // Upgrade earlier builds by keeping earned prizes, without granting free previews.
 let previous={};try{previous=JSON.parse(sessionStorage.getItem('apple-works-demo-v1'))?.state||{}}catch{}
 state.gachaOwned=expandWardrobeUnlocks([...readWardrobeCollection(),...(Array.isArray(previous.gachaOwned)?previous.gachaOwned:[]),...(Array.isArray(state.gachaOwned)?state.gachaOwned:[])]);
 if(!wardrobeCatalogByKey.has(state.gachaPending)){
  try{const pending=JSON.parse(sessionStorage.getItem(WARDROBE_PENDING_KEY))||(previous.gachaPending?{key:previous.gachaPending,color:previous.gachaColor}:null);
   state.gachaPending=wardrobeCatalogByKey.has(pending?.key)?pending.key:null;
   if(state.gachaPending)state.gachaColor=Number.isInteger(pending.color)&&pending.color>=0&&pending.color<8?pending.color:0;
  }catch{state.gachaPending=null}
 }
}
function persistWardrobeCollection(){
 // Merge discoveries from other open game tabs instead of overwriting them.
 state.gachaOwned=expandWardrobeUnlocks([...readWardrobeCollection(),...(state.gachaOwned||[])]);
 try{localStorage.setItem(WARDROBE_COLLECTION_KEY,JSON.stringify({version:1,owned:state.gachaOwned}))}catch{}
 try{
  if(state.gachaPending)sessionStorage.setItem(WARDROBE_PENDING_KEY,JSON.stringify({key:state.gachaPending,color:state.gachaColor}));
  else sessionStorage.removeItem(WARDROBE_PENDING_KEY);
 }catch{}
}
function isWardrobeItemUnlocked(category,id){
 if(id==null)return true;
 const key=category+':'+id;
 return WARDROBE_STARTERS.includes(key)||(state.gachaOwned||[]).includes(key);
}
function unlockWardrobeItem(category,id){
 state.gachaOwned=expandWardrobeUnlocks([...(state.gachaOwned||[]),category+':'+id]);
 persistWardrobeCollection();
}
function sanitizeWardrobeOutfit(outfit={}){
 const safe={skin:'milk-frog'};
 for(const [category,id] of Object.entries(outfit))if(isWardrobeItemUnlocked(category,id))safe[category]=id;
 return safe;
}
function unlockedWardrobeCount(){
 return new Set([...WARDROBE_STARTERS,...(state.gachaOwned||[])]).size;
}
