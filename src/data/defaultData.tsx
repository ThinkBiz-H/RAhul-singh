import type { AppData } from "../types";

const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * Seed data uses Cloudinary's public "demo" cloud (res.cloudinary.com/demo/...)
 * so that every image in this app — including placeholders — is served from
 * Cloudinary, never from a local file. Replace all of this from the Admin
 * panel; anything you upload there goes to *your* Cloudinary account instead.
 */
const demo = (
  publicId: string,
  transform = "f_auto,q_auto,c_fill,w_1600,h_900",
) => `https://res.cloudinary.com/demo/image/upload/${transform}/${publicId}`;

const CAT_ELECTION = uid();
const CAT_WINNING = uid();
const CAT_MEETINGS = uid();
const CAT_EVENTS = uid();
const CAT_PRESS = uid();
const CAT_DEV = uid();
const CAT_OTHERS = uid();

export const defaultData: AppData = {
  hero: {
    slides: [
      {
        id: uid(),
        image: demo("samples/landscapes/nature-mountains"),
        title: "आओ साथ चले नए भारत में, भागीदार बने",
        subtitle: "जनसेवा ही मेरा धर्म है",
        buttonText: "संपर्क करें",
        buttonLink: "/contact",
        order: 0,
      },
      {
        id: uid(),
        image: demo("samples/landscapes/beach-boat"),
        title: "किसान, मज़दूर और गरीबों की आवाज़",
        subtitle: "हर वर्ग के साथ, हर कदम पर",
        buttonText: "और जानें",
        buttonLink: "/about",
        order: 1,
      },
    ],
  },
  biography: {
    aboutImages: [
      {
        id: uid(),
        image: demo(
          "samples/people/boy-snow-hoodie",
          "f_auto,q_auto,c_fill,w_1000,h_1000",
        ),
        alt: "Profile photo",
        primary: true,
      },
      {
        id: uid(),
        image: demo(
          "samples/people/kitchen-bar",
          "f_auto,q_auto,c_fill,w_1000,h_1000",
        ),
        alt: "Addressing a public gathering",
        primary: false,
      },
    ],
    heading: "हमारे नेता",
    subheading: "एक किसान परिवार से जनप्रतिनिधि तक का सफर",
    paragraphs: [
      "एक लोकप्रिय जननेता, जिनका जन्म एक किसान परिवार में हुआ। प्राथमिक व माध्यमिक शिक्षा गांव में रहकर ग्रहण की और गांव के गरीब किसान, मज़दूर एवं झोंपड़ी में रहने वाले लोगों के संघर्ष को नज़दीक से देखा और समझा।",
      "माध्यमिक शिक्षा उत्तीर्ण करने के पश्चात उच्च शिक्षा प्राप्त करते हुए छात्र राजनीति में सक्रिय रहे और अनेक छात्र आंदोलनों का नेतृत्व किया। अपने संघर्ष, लोकप्रियता एवं परोपकार के बल पर क्षेत्र के लोकप्रिय युवा नेता के रूप में उभरे।",
      "जनता के अटूट विश्वास और समर्थन के चलते विधान सभा तथा विधान परिषद के सदस्य रहते हुए क्षेत्र के विकास कार्यों को गति दी और वर्तमान सरकार में महत्वपूर्ण विभागों का दायित्व संभाला।",
      "वे लीक से हटकर राजनीति करने वाले नेता हैं, जो सदैव गरीब, मज़दूर, किसान, शोषित एवं पीड़ित वर्ग की सेवा के लिए समर्पित रहते हैं।",
    ],
  },
  categories: [
    {
      id: CAT_ELECTION,
      name: "Election Campaign 2022",
      slug: "election-campaign-2022",
      order: 0,
    },
    {
      id: CAT_WINNING,
      name: "Winning Moments",
      slug: "winning-moments",
      order: 1,
    },
    {
      id: CAT_MEETINGS,
      name: "Public Meetings",
      slug: "public-meetings",
      order: 2,
    },
    { id: CAT_EVENTS, name: "Events", slug: "events", order: 3 },
    {
      id: CAT_PRESS,
      name: "Press Conference",
      slug: "press-conference",
      order: 4,
    },
    {
      id: CAT_DEV,
      name: "Development Works",
      slug: "development-works",
      order: 5,
    },
    { id: CAT_OTHERS, name: "Others", slug: "others", order: 6 },
  ],
  gallery: [
    {
      id: uid(),
      image: demo("samples/people/bicycle", "f_auto,q_auto,c_fill,w_900,h_675"),
      title: "चुनावी जनसभा",
      categoryId: CAT_ELECTION,
      description: "क्षेत्र में जनसभा को संबोधित करते हुए",
      tags: ["election", "2022"],
      featured: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    },
    {
      id: uid(),
      image: demo(
        "samples/landscapes/architecture-signs",
        "f_auto,q_auto,c_fill,w_900,h_675",
      ),
      title: "जीत का पल",
      categoryId: CAT_WINNING,
      description: "चुनाव परिणाम के दिन कार्यकर्ताओं के साथ",
      tags: ["winning", "2022"],
      featured: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25,
    },
    {
      id: uid(),
      image: demo("samples/people/jazz", "f_auto,q_auto,c_fill,w_900,h_675"),
      title: "जनता से संवाद",
      categoryId: CAT_MEETINGS,
      description: "स्थानीय जनप्रतिनिधियों के साथ बैठक",
      tags: ["meeting"],
      featured: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    },
    {
      id: uid(),
      image: demo("samples/food/dessert", "f_auto,q_auto,c_fill,w_900,h_675"),
      title: "सांस्कृतिक कार्यक्रम",
      categoryId: CAT_EVENTS,
      description: "क्षेत्रीय सांस्कृतिक कार्यक्रम में मुख्य अतिथि",
      tags: ["event"],
      featured: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    },
    {
      id: uid(),
      image: demo(
        "samples/food/pot-mussels",
        "f_auto,q_auto,c_fill,w_900,h_675",
      ),
      title: "मीडिया वार्ता",
      categoryId: CAT_PRESS,
      description: "पत्रकारों के सवालों का जवाब देते हुए",
      tags: ["press"],
      featured: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    },
    {
      id: uid(),
      image: demo(
        "samples/landscapes/nature-mountains",
        "f_auto,q_auto,c_fill,w_900,h_675",
      ),
      title: "सड़क निर्माण कार्य",
      categoryId: CAT_DEV,
      description: "क्षेत्र में सड़क निर्माण कार्य का निरीक्षण",
      tags: ["development"],
      featured: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    },
    {
      id: uid(),
      image: demo(
        "samples/animals/three-dogs",
        "f_auto,q_auto,c_fill,w_900,h_675",
      ),
      title: "अन्य कार्यक्रम",
      categoryId: CAT_OTHERS,
      description: "विविध सामाजिक कार्यक्रमों की झलक",
      tags: ["others"],
      featured: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
  ],
  contact: {
    contactBanner: demo(
      "samples/landscapes/architecture-signs",
      "f_auto,q_auto,c_fill,w_1600,h_500",
    ),
    officeAddress: "लोहिया नगर, बन्नादेवी, जी.टी. रोड, अलीगढ़, उत्तर प्रदेश",
    email: "contact@example.com",
    phone: "+91 90000 00000",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Aligarh,Uttar+Pradesh&output=embed",
    workingHours: "सोम - शनि: सुबह 10:00 बजे - शाम 6:00 बजे",
    social: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://twitter.com/",
      youtube: "https://www.youtube.com/",
    },
  },
  messages: [],
  settings: {
    siteName: "Rahul Singh",
    logo: "",
    footerText: "जनसेवा ही सर्वोपरि धर्म है।",
    copyrightText: "© Rahul Singh. All Rights Reserved.",
  },
};
