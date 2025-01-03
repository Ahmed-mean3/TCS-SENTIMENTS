import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
  useCartLines,
  useAttributes,
  useNote,
  useStorage,
  useAttributeValues,
  Link,
  useBuyerJourneyIntercept,
  useShippingAddress,
  Button,
  useApplyShippingAddressChange,
} from "@shopify/ui-extensions-react/checkout";
import { useState, useEffect } from "react";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const api = useApi();
  const attribute = useAttributes();
  const notes = useNote();
  const address = useShippingAddress();
  const cart = useCartLines();
  const applyShippingAddressChange = useApplyShippingAddressChange();
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shopData, setShopData] = useState();
  // console.log('attribute data->>>', attribute)
  // console.log('cart data->>>', cart)
  // console.log('attribute another data->>>', another)
  // console.log('notes data->>>', notes)
  const countryCodeMap = {
    "Pakistan": "PK",
    "UK": "GB",
    "USA": "US",
    "Germany": "DE",
    "UAE": "AE",
    "Singapore": "SG",
    "Sweden": "SE",
    "Denmark": "DK",
    "Australia": "AU",
    "China": "CN",
    "Canada": "CA",
    "India": "IN",
    "Ireland": "IE",
    "Qatar": "QA",
    "Saudi Arabia": "SA"
  };
  const countryList = {
    "Pakistan": true,
    "UK": true,
    "USA": true,
    "Germany": true,
    "UAE": true,
    "Singapore": true,
    "Sweden": true,
    "Denmark": true,
    "Australia": true,
    "China": true,
    "Canada": true,
    "India": true,
    "Ireland": true,
    "Qatar": true,
    "Saudi Arabia": true
  };
  function findKeyValue(array, requiredKey) {
    const foundItem = array.find(
      item => item?.key === requiredKey && item.value
    );

    if (foundItem) {
      return { exists: true, keyValue: foundItem };
    }

    return { exists: false, keyValue: null };
  }

  function isCityInPakistan(inputCity) {
    const userCities = [
      { label: "Islamabad", value: "1" },
      { label: "Karachi", value: "2" },
      { label: "Lahore", value: "3" },
      { label: "Abbottabad", value: "4" },
      { label: "Abdul Hakim", value: "5" },
      { label: "Adda Johal 97 / Rb", value: "6" },
      { label: "Adda Sheikh Wan", value: "7" },
      { label: "Adda Siraj", value: "8" },
      { label: "Ahmedpur East", value: "9" },
      { label: "Ahmedpur Sial", value: "10" },
      { label: "Ajnia Wala", value: "11" },
      { label: "Akhtar Abad", value: "12" },
      { label: "Akora Khattak", value: "13" },
      { label: "Ali Pur Chatha", value: "14" },
      { label: "Alipur", value: "15" },
      { label: "Allah Abad", value: "16" },
      { label: "Amangarh", value: "17" },
      { label: "Ameenpur Bangla", value: "18" },
      { label: "Arifwala", value: "19" },
      { label: "Attock", value: "20" },
      { label: "Ayubia", value: "21" },
      { label: "Baddomalhi", value: "22" },
      { label: "Badin", value: "23" },
      { label: "Baffa", value: "24" },
      { label: "Bagh AJK", value: "25" },
      { label: "Bahawalnagar", value: "26" },
      { label: "Bahawalpur", value: "27" },
      { label: "Bahtar More", value: "28" },
      { label: "Baig Pur", value: "29" },
      { label: "Balakot", value: "30" },
      { label: "Balam But", value: "31" },
      { label: "Banguldero", value: "32" },
      { label: "Bannu", value: "33" },
      { label: "Bara Market", value: "34" },
      { label: "Barikot", value: "35" },
      { label: "Basharat", value: "36" },
      { label: "Basirpur", value: "37" },
      { label: "Basti Malook", value: "38" },
      { label: "Batkhela", value: "39" },
      { label: "Battagram", value: "40" },
      { label: "Bela", value: "41" },
      { label: "Bhagtanwala", value: "42" },
      { label: "Bhai Pheru", value: "43" },
      { label: "Bhakkar", value: "44" },
      { label: "Bhalwal", value: "45" },
      { label: "Bhan Syedabad", value: "46" },
      { label: "Bhara Kahu", value: "47" },
      { label: "Bhera", value: "48" },
      { label: "Bhikki", value: "49" },
      { label: "Bhimber", value: "50" },
      { label: "Bhowana", value: "51" },
      { label: "Bhurban", value: "52" },
      { label: "Bonga Hayat", value: "53" },
      { label: "Bucheki", value: "54" },
      { label: "Buner", value: "55" },
      { label: "Burewala", value: "56" },
      { label: "Cadet College Sunny Bank", value: "57" },
      { label: "Chak Jhumra", value: "58" },
      { label: "Chak Parana", value: "59" },
      { label: "Chakdara", value: "60" },
      { label: "Chaklala", value: "61" },
      { label: "Chakri", value: "62" },
      { label: "Chakwal", value: "63" },
      { label: "Chaman", value: "64" },
      { label: "Changa Manga", value: "65" },
      { label: "Charbagh", value: "66" },
      { label: "Charsadda", value: "67" },
      { label: "Chashma", value: "68" },
      { label: "Chawinda", value: "69" },
      { label: "Chenab Nagar", value: "70" },
      { label: "Chichawatni", value: "71" },
      { label: "Chiniot", value: "72" },
      { label: "Chishtian", value: "73" },
      { label: "Chitral", value: "74" },
      { label: "Choa Saidan Shah", value: "75" },
      { label: "Chobara", value: "76" },
      { label: "Chohar Jamali", value: "77" },
      { label: "Chor", value: "78" },
      { label: "Chota Lahore", value: "79" },
      { label: "Chowk Azam", value: "80" },
      { label: "Chowk Munda", value: "81" },
      { label: "Chowk Pandori", value: "82" },
      { label: "Chunian", value: "83" },
      { label: "Dadu", value: "84" },
      { label: "Dadyal AJK", value: "85" },
      { label: "Dakwala", value: "86" },
      { label: "Daood Zai", value: "87" },
      { label: "Dargai", value: "88" },
      { label: "Darro", value: "89" },
      { label: "Darya Khan", value: "90" },
      { label: "Daska", value: "91" },
      { label: "Daud Khel", value: "92" },
      { label: "Daul Tala", value: "93" },
      { label: "Daulatpur", value: "94" },
      { label: "Daur", value: "95" },
      { label: "Deharki", value: "96" },
      { label: "Depalpur", value: "97" },
      { label: "Dera Allah Yar", value: "98" },
      { label: "Dera Ghazi Khan", value: "99" },
      { label: "Dera Ismail Khan", value: "100" },
      { label: "Dera Murad Jamali", value: "101" },
      { label: "Dera Nawab", value: "102" },
      { label: "Dewalay", value: "103" },
      { label: "Dhabeji", value: "104" },
      { label: "Dhudial", value: "105" },
      { label: "Digri", value: "106" },
      { label: "Dijkot", value: "107" },
      { label: "Dina", value: "108" },
      { label: "Dinga", value: "109" },
      { label: "Distt. Complex", value: "110" },
      { label: "Doaba", value: "111" },
      { label: "Dokri", value: "112" },
      { label: "Donga Bonga", value: "113" },
      { label: "Dulle Wala", value: "114" },
      { label: "Dunyapur", value: "115" },
      { label: "Faisalabad", value: "116" },
      { label: "Faqirwali", value: "117" },
      { label: "Farooka", value: "118" },
      { label: "Farooqabad", value: "119" },
      { label: "Fateh Jang", value: "120" },
      { label: "Fateh Pur Kamal", value: "121" },
      { label: "Fazilpur", value: "122" },
      { label: "Feroze Wattwan", value: "123" },
      { label: "Fkpcl Power Plant", value: "124" },
      { label: "Fort Abbas", value: "125" },
      { label: "Gaggoo Mandi", value: "126" },
      { label: "Gakhar", value: "127" },
      { label: "Gambat", value: "128" },
      { label: "Gamber", value: "129" },
      { label: "Garh Mor", value: "130" },
      { label: "Garha More", value: "131" },
      { label: "Gatwala 199 / Rb", value: "132" },
      { label: "Ghari Habibullah", value: "133" },
      { label: "Gharibwal Cement", value: "134" },
      { label: "Gharo", value: "135" },
      { label: "Ghazi", value: "136" },
      { label: "Ghaziabad", value: "137" },
      { label: "Ghika Gali", value: "138" },
      { label: "Ghora Gali", value: "139" },
      { label: "Ghotki", value: "140" },
      { label: "Ghour Ghusti", value: "141" },
      { label: "Ghouspur", value: "142" },
      { label: "Gilgit", value: "143" },
      { label: "Gojra", value: "144" },
      { label: "Golarchi", value: "145" },
      { label: "Goth Machi", value: "146" },
      { label: "Gujar Khan", value: "147" },
      { label: "Gujranwala", value: "148" },
      { label: "Gujrat", value: "149" },
      { label: "Gulyana", value: "150" },
      { label: "Gwadar", value: "151" },
      { label: "Hafizabad", value: "152" },
      { label: "Hajira", value: "153" },
      { label: "Hakeem Abad", value: "154" },
      { label: "Hala", value: "155" },
      { label: "Hangu", value: "156" },
      { label: "Harappa", value: "157" },
      { label: "Haripur", value: "158" },
      { label: "Harnal", value: "159" },
      { label: "Haroonabad", value: "160" },
      { label: "Haseeb Waqas Mills", value: "161" },
      { label: "Hasilpur", value: "162" },
      { label: "Hassan Abdal", value: "163" },
      { label: "Hattar", value: "164" },
      { label: "Hattian Bala", value: "165" },
      { label: "Haveli Lakha", value: "166" },
      { label: "Havelian", value: "167" },
      { label: "Hazara University", value: "168" },
      { label: "Hazro", value: "169" },
      { label: "Head Baloki Road", value: "170" },
      { label: "Head Marralla", value: "171" },
      { label: "Hub Chowki", value: "172" },
      { label: "Hujra Shah Muqeem", value: "173" },
      { label: "Hunza Valley", value: "174" },
      { label: "Husri", value: "175" },
      { label: "Hyderabad", value: "176" },
      { label: "Iqbal Abad", value: "177" },
      { label: "Iqbal Nagar", value: "178" },
      { label: "Jacobabad", value: "179" },
      { label: "Jaffarabad", value: "180" },
      { label: "Jahanian", value: "181" },
      { label: "Jalalpur Bhattian", value: "182" },
      { label: "Jalalpur Jattan", value: "183" },
      { label: "Jalalpur Pirwala", value: "184" },
      { label: "Jampur", value: "185" },
      { label: "Jamshoro", value: "186" },
      { label: "Jandia Sher Khan", value: "187" },
      { label: "Jaranwala", value: "188" },
      { label: "Jatlan", value: "189" },
      { label: "Jatoi", value: "190" },
      { label: "Jauharabad", value: "191" },
      { label: "Jehangira", value: "192" },
      { label: "Jhabran Mandi", value: "193" },
      { label: "Jhang", value: "194" },
      { label: "Jhelum", value: "195" },
      { label: "Jhol", value: "196" },
      { label: "Jhuddo", value: "197" },
      { label: "Johi", value: "198" },
      { label: "Kabirwala", value: "199" },
      { label: "Kacha Khuh", value: "200" },
      { label: "Kahuta", value: "201" },
      { label: "Kalat", value: "202" },
      { label: "Kallar Kahar", value: "203" },
      { label: "Kallar Syeddan", value: "204" },
      { label: "Kallur Kot", value: "205" },
      { label: "Kamalia", value: "206" },
      { label: "Kamoke", value: "207" },
      { label: "Kamra", value: "208" },
      { label: "Kandhkot", value: "209" },
      { label: "Kandiaro", value: "210" },
      { label: "Kanganpur", value: "211" },
      { label: "Kangra", value: "212" },
      { label: "Kanju", value: "213" },
      { label: "Kanyal", value: "214" },
      { label: "Kapco Power Plant", value: "215" },
      { label: "Karak", value: "216" },
      { label: "Karam Pur", value: "217" },
      { label: "Karor Lal Esan", value: "218" },
      { label: "Karor Pakka", value: "219" },
      { label: "Kashmore", value: "220" },
      { label: "Kassowal", value: "221" },
      { label: "Kasur", value: "222" },
      { label: "Khairpur", value: "223" },
      { label: "Khairpur Meerus", value: "224" },
      { label: "Khairpur Nathan Shah", value: "225" },
      { label: "Khairpur Tamewali", value: "226" },
      { label: "Khan Bela", value: "227" },
      { label: "Khan Gah Dogran", value: "228" },
      { label: "Khan Garh", value: "229" },
      { label: "Khanewal", value: "230" },
      { label: "Khanpur", value: "231" },
      { label: "Khanpur Mahar", value: "232" },
      { label: "Kharian", value: "233" },
      { label: "Khas Behaal", value: "234" },
      { label: "Khewra", value: "235" },
      { label: "Khidarwala", value: "236" },
      { label: "Khoaza Khaila", value: "237" },
      { label: "Khoski", value: "238" },
      { label: "Khudian Khas", value: "239" },
      { label: "Khurianwala", value: "240" },
      { label: "Khushab", value: "241" },
      { label: "Khuzdar", value: "242" },
      { label: "Kohat", value: "243" },
      { label: "Kot Addu", value: "244" },
      { label: "Kot Chutta", value: "245" },
      { label: "Kot Ghulam Muhammad", value: "246" },
      { label: "Kot Mitthan", value: "247" },
      { label: "Kot Momin", value: "248" },
      { label: "Kot Pindi Das", value: "249" },
      { label: "Kot Radha Kishan", value: "250" },
      { label: "Kot Samaba", value: "251" },
      { label: "Kotla Arab Ali Khan", value: "252" },
      { label: "Kotli", value: "253" },
      { label: "Kotli Behram", value: "254" },
      { label: "Kotli Loharan", value: "255" },
      { label: "Kotri", value: "256" },
      { label: "Kuchlak", value: "257" },
      { label: "Kulachi", value: "258" },
      { label: "Kundian", value: "259" },
      { label: "Kunjah", value: "260" },
      { label: "Kunri", value: "261" },
      { label: "Lakki Marwat", value: "262" },
      { label: "Lala Musa", value: "263" },
      { label: "Lalian", value: "264" },
      { label: "Lallian", value: "265" },
      { label: "Lalliani", value: "266" },
      { label: "Lalpir (Thermal Power)", value: "267" },
      { label: "Larkana", value: "268" },
      { label: "Lawrence Pur", value: "269" },
      { label: "Layyah", value: "270" },
      { label: "Liaqat Pur", value: "271" },
      { label: "Liaqatabad", value: "272" },
      { label: "Lodhran", value: "273" },
      { label: "Loralai", value: "274" },
      { label: "Lower Dir", value: "275" },
      { label: "Lower Topa", value: "276" },
      { label: "Machikey", value: "277" },
      { label: "Mailsi", value: "278" },
      { label: "Makli", value: "279" },
      { label: "Malakand", value: "280" },
      { label: "Malakwal", value: "281" },
      { label: "Mamu Kanjan", value: "282" },
      { label: "Mana Wla", value: "283" },
      { label: "Manawala", value: "284" },
      { label: "Mandi", value: "285" },
      { label: "Mandi Bahauddin", value: "286" },
      { label: "Mandi Safdar Abad", value: "287" },
      { label: "Mandi Usman Wala", value: "288" },
      { label: "Mandra", value: "289" },
      { label: "Manga Mandi", value: "290" },
      { label: "Mangla AJK", value: "291" },
      { label: "Mangla Cantt (Ajk)", value: "292" },
      { label: "Mankera", value: "293" },
      { label: "Mankyla Station", value: "294" },
      { label: "Mansehra", value: "295" },
      { label: "Mardan", value: "296" },
      { label: "Mari", value: "297" },
      { label: "Masar Camp", value: "298" },
      { label: "Mastung", value: "299" },
      { label: "Matiari", value: "300" },
      { label: "Matli", value: "301" },
      { label: "Matta", value: "302" },
      { label: "Meher", value: "303" },
      { label: "Mehmood Kot", value: "304" },
      { label: "Mehrabpur", value: "305" },
      { label: "Mian Channu", value: "306" },
      { label: "Mian Wali Qureshain", value: "307" },
      { label: "Miani", value: "308" },
      { label: "Mianwali", value: "309" },
      { label: "Minchinabad", value: "310" },
      { label: "Mingora", value: "311" },
      { label: "Mirpur AJK", value: "312" },
      { label: "Mirpur Bathoro", value: "313" },
      { label: "Mirpur Khas", value: "314" },
      { label: "Mirpur Mathelo", value: "315" },
      { label: "Mirpur Sakro", value: "316" },
      { label: "Mithatawana", value: "317" },
      { label: "Mithi", value: "318" },
      { label: "More Aimanabad", value: "319" },
      { label: "More Khunda", value: "320" },
      { label: "Moro", value: "321" },
      { label: "Motra", value: "322" },
      { label: "Multan", value: "323" },
      { label: "Muridke", value: "324" },
      { label: "Murree", value: "325" },
      { label: "Muzaffarabad AJK", value: "326" },
      { label: "Muzaffargarh", value: "327" },
      { label: "Nankana Sahib", value: "328" },
      { label: "Narang Mandi", value: "329" },
      { label: "Narowal", value: "330" },
      { label: "Nasarpur", value: "331" },
      { label: "Nasirabad", value: "332" },
      { label: "Nathia Gali", value: "333" },
      { label: "Naudero", value: "334" },
      { label: "Naushahro Feroze", value: "335" },
      { label: "Nawabpur", value: "336" },
      { label: "Nawabshah", value: "337" },
      { label: "Nawan Shehr", value: "338" },
      { label: "Naway Kali", value: "339" },
      { label: "Naya Lahore", value: "340" },
      { label: "New Industrial Area", value: "341" },
      { label: "Nizamabad", value: "342" },
      { label: "Nokhar", value: "343" },
      { label: "Nonar", value: "344" },
      { label: "Noor Colony", value: "345" },
      { label: "Noorpur", value: "346" },
      { label: "Noorpur Thal", value: "347" },
      { label: "Noriabad", value: "348" },
      { label: "Nowshera", value: "349" },
      { label: "Nowshera Kalan", value: "350" },
      { label: "Nowshera Virkan", value: "351" },
      { label: "NRTC (Telecom Staff College)", value: "352" },
      { label: "Nurkot", value: "353" },
      { label: "Nushki", value: "354" },
      { label: "Okara", value: "355" },
      { label: "Old Hala", value: "356" },
      { label: "P.O.F. (Factory & Colony)", value: "357" },
      { label: "Pabbi", value: "358" },
      { label: "Paharpur", value: "359" },
      { label: "Pakpattan", value: "360" },
      { label: "Pano Aqil", value: "361" },
      { label: "Paroa", value: "362" },
      { label: "Pasroor", value: "363" },
      { label: "Patriata", value: "364" },
      { label: "Pattoki", value: "365" },
      { label: "Peshawar", value: "366" },
      { label: "Pezu", value: "367" },
      { label: "Phalia", value: "368" },
      { label: "Phool Nagar", value: "369" },
      { label: "Phularwan", value: "370" },
      { label: "Pind Dadan Khan", value: "371" },
      { label: "Pindi Bhattian", value: "372" },
      { label: "Pindi Gujran", value: "373" },
      { label: "Pindigheb", value: "374" },
      { label: "Piplan", value: "375" },
      { label: "Pir Bala", value: "376" },
      { label: "Pishin", value: "377" },
      { label: "Pitaro", value: "378" },
      { label: "PMA Kakul", value: "379" },
      { label: "Poonch (AJK)", value: "380" },
      { label: "Pungirayin", value: "381" },
      { label: "Punwan", value: "382" },
      { label: "Qabal", value: "383" },
      { label: "Qaboola", value: "384" },
      { label: "Qadir Pur", value: "385" },
      { label: "Qamber", value: "386" },
      { label: "Qazi Ahmed", value: "387" },
      { label: "Qila Deedar Sing", value: "388" },
      { label: "Qila Saib Singh", value: "389" },
      { label: "Quaidabad", value: "390" },
      { label: "Quetta", value: "391" },
      { label: "Rabwah", value: "392" },
      { label: "Radhan", value: "393" },
      { label: "Rahim Yar Khan", value: "394" },
      { label: "Raiwind", value: "395" },
      { label: "Raja Jang", value: "396" },
      { label: "Rajana", value: "397" },
      { label: "Rajanpur", value: "398" },
      { label: "Rajar", value: "399" },
      { label: "Ramak", value: "400" },
      { label: "Ranipur", value: "401" },
      { label: "Rao Khan Wala", value: "402" },
      { label: "Rashaki", value: "403" },
      { label: "Rato Dero", value: "404" },
      { label: "Rawalakot AJK", value: "405" },
      { label: "Rawalpindi", value: "406" },
      { label: "Rawat", value: "407" },
      { label: "Renala Khurd", value: "408" },
      { label: "Risalpur", value: "409" },
      { label: "Rohri", value: "410" },
      { label: "Sadiqabad", value: "411" },
      { label: "Safdarabad", value: "412" },
      { label: "Sahiwal", value: "413" },
      { label: "Saidu Sharif", value: "414" },
      { label: "Sajawal", value: "415" },
      { label: "Sakrand", value: "416" },
      { label: "Samaro", value: "417" },
      { label: "Samundri", value: "418" },
      { label: "Sangar", value: "419" },
      { label: "Sangla Hill", value: "420" },
      { label: "Sanjhoro", value: "421" },
      { label: "Sanjwal", value: "422" },
      { label: "Sarai Alamgir", value: "423" },
      { label: "Sarai Naurang", value: "424" },
      { label: "Sardar Garh", value: "425" },
      { label: "Sardaryab", value: "426" },
      { label: "Sargodha", value: "427" },
      { label: "Satiana", value: "428" },
      { label: "Sawabi", value: "429" },
      { label: "Sehwan Sharif", value: "430" },
      { label: "Shabqadar", value: "431" },
      { label: "Shadad Kot", value: "432" },
      { label: "Shadiwal", value: "433" },
      { label: "Shahdad Pur", value: "434" },
      { label: "Shahdara", value: "435" },
      { label: "Shahkot", value: "436" },
      { label: "Shahpur Chakar", value: "437" },
      { label: "Shahpur Jehanian", value: "438" },
      { label: "Shakargarh", value: "439" },
      { label: "Sham Kot", value: "440" },
      { label: "Shams Abad", value: "441" },
      { label: "Shangla", value: "442" },
      { label: "Sharaqpur", value: "443" },
      { label: "Sheedo", value: "444" },
      { label: "Sheikhupura", value: "445" },
      { label: "Shergarh", value: "446" },
      { label: "Shewa Adda", value: "447" },
      { label: "Shikarpur", value: "448" },
      { label: "Shimla Hill", value: "449" },
      { label: "Shorkot", value: "450" },
      { label: "Shujaabad", value: "451" },
      { label: "Sialkot", value: "452" },
      { label: "Sibi", value: "453" },
      { label: "Sihala", value: "454" },
      { label: "Sikandarabad", value: "455" },
      { label: "Sillanwali", value: "456" },
      { label: "Sinjhoro", value: "457" },
      { label: "Siraye Muhajir", value: "458" },
      { label: "Skardu", value: "459" },
      { label: "Smaal Ind Estate. Daska", value: "460" },
      { label: "Sohawa Only Main Gt Road", value: "461" },
      { label: "Sudhanoti", value: "462" },
      { label: "Sukkur", value: "463" },
      { label: "Sumbrial", value: "464" },
      { label: "Sundar Adda", value: "465" },
      { label: "Swabi", value: "466" },
      { label: "Swat", value: "467" },
      { label: "Syed Wala", value: "468" },
      { label: "Takhat Bai", value: "469" },
      { label: "Talagang", value: "470" },
      { label: "Talhar", value: "471" },
      { label: "Talvandi", value: "472" },
      { label: "Tandlianwala", value: "473" },
      { label: "Tando Adam", value: "474" },
      { label: "Tando Allahyar", value: "475" },
      { label: "Tando Bagho", value: "476" },
      { label: "Tando Ghulam Ali", value: "477" },
      { label: "Tando Jam", value: "478" },
      { label: "Tando Jan Mohammad", value: "479" },
      { label: "Tando Mohd Khan", value: "480" },
      { label: "Tando Qaiser", value: "481" },
      { label: "Tangi", value: "482" },
      { label: "Tank", value: "483" },
      { label: "Tarbela Dam", value: "484" },
      { label: "Tarnol", value: "485" },
      { label: "Taunsa Sharif", value: "486" },
      { label: "Taxila", value: "487" },
      { label: "Thatta", value: "488" },
      { label: "Theeng More", value: "489" },
      { label: "Thul", value: "490" },
      { label: "Tibba Sultanpur", value: "491" },
      { label: "Timergara", value: "492" },
      { label: "Toba Tek Singh", value: "493" },
      { label: "Topi", value: "494" },
      { label: "Tranda Mohammad Panah", value: "495" },
      { label: "Tranda Saway Khan", value: "496" },
      { label: "Tulamba", value: "497" },
      { label: "Turbat", value: "498" },
      { label: "Ubaro", value: "499" },
      { label: "Uch Sharif", value: "500" },
      { label: "Ugoki", value: "501" },
      { label: "Umerkot", value: "502" },
      { label: "Usta Muhammad", value: "503" },
      { label: "Vehari", value: "504" },
      { label: "Village Sial", value: "505" },
      { label: "Wah Cantt", value: "506" },
      { label: "Wan Rahda Ram", value: "507" },
      { label: "Wapda Colony (Ajk)", value: "508" },
      { label: "Warbattan", value: "509" },
      { label: "Wazirabad", value: "510" },
      { label: "Winder", value: "511" },
      { label: "Yazman", value: "512" },
      { label: "Zafarwal", value: "513" },
      { label: "Zahir Pir", value: "514" },
    ];
    return userCities.some(city => city.label.toLowerCase() === inputCity.toLowerCase());
  }


  const handleCityChange = async (_city = "") => {
    // console.log("handleCityChange", _city);
    // const matchedCity = userCities.find(
    //   (city) => city.value === _city && city.value !== "769"
    // );
    // const cityLabel = matchedCity ? matchedCity.label : undefined;

    // if (!_city) {
    //   setSelectedCity(_city); // Update the state

    if (_city) {
      await applyShippingAddressChange({
        type: "updateShippingAddress",
        address: {
          city: _city,
        },
      });
    }

    // }
  };

  const handleCountryChange = async (code = "") => {
    // let check = false;
    // if (code) {
    //   check = isCityInPakistan(code)
    // }
    // console.log('code check', code)
    if (code) {
      await applyShippingAddressChange({
        type: "updateShippingAddress",
        address: {
          countryCode: code,
        },
      });
    }

    // }
  };

  useBuyerJourneyIntercept(async ({ canBlockProgress }) => {
    // console.log('checking', !(findKeyValue(attribute, 'Delivery Date').exists))
    if (!(findKeyValue(attribute, 'Order Note').exists)) {
      setValidate(true)
      return {
        behavior: "block",
        reason: "Empty notes",
        errors: [
          {
            message: "Notes have not filled at cart page, please go back & fill it.",
            target: "$.purchase.checkout.block.render",
          },
        ],
      };
    }
    if (!(findKeyValue(attribute, 'Delivery Date').exists)) {
      setValidate(true)

      return {
        behavior: "block",
        reason: "Empty Delivery Date",
        errors: [
          {
            message: "Delivery Date has not filled at cart page, please go back & fill it.",
            target: "$.purchase.checkout.block.render",
          },
        ],
      };
    }
    if (!(findKeyValue(attribute, 'Delivery Country').exists)) {
      setValidate(true)

      return {
        behavior: "block",
        reason: "Empty Delivery Location",
        errors: [
          {
            message: "Delivery Location has not filled at cart page, please go back & reselect country.",
            target: "$.purchase.checkout.block.render",
          },
        ],
      };
    }
    // Default allow
    return { behavior: "allow" };
  });

  useEffect(() => {
    setIsLoading(true);
    api
      .query(
        `{
  shop{
    name
    primaryDomain{
      host
      url
    }
  }
}`,
        {
          variables: { first: 100 },
        }
      )
      .then(({ data, errors }) => {
        // setLoading(true);

        setShopData(data?.shop?.primaryDomain?.host);
        if (errors) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error fetching shop name", error);
      });
  }, [api.query]);

  // useEffect(() => {
  //   // if (address.countryCode !== "PK") {
  //   let countryCode = "PK";
  //   if (!!countryList[findKeyValue(attribute, 'Delivery Country').keyValue?.value]) {
  //     countryCode = countryCodeMap[findKeyValue(attribute, 'Delivery Country').keyValue?.value];
  //   }
  //   handleCountryChange(countryCode)
  //   // }
  //   const cartCity = findKeyValue(attribute, 'Delivery Location').keyValue?.value
  //   // console.log('cartCity->>>', cartCity, 'cartCity->>>', address.city)

  //   if (address.countryCode === "PK" && (address.city !== cartCity || address.city === "" || address.city === undefined || address.city === null)) {
  //     // console.log(findKeyValue(attribute, 'Delivery Location').keyValue?.value)
  //     handleCityChange(findKeyValue(attribute, 'Delivery Location').keyValue?.value)
  //   }
  // }, [address.countryCode, address.city])

  return (
    <BlockStack border={"none"}>
      {shopData && validate && <Button to={`https://${shopData}/cart`} appearance="warning" kind="secondary" inlineAlignment="center">Go back</Button>}
      {/* <Button>jdjd</Button> */}
    </BlockStack>
  );


}