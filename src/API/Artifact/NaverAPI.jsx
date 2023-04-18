import axios from "axios";
import Naver from "../KeyFile/Naver.json";
const NaverOption = {
  "X-Naver-Client-Id": Naver.id,
  "X-Naver-Client-Secret": Naver.key,
};
const CORS = "https://minicastleproxy.herokuapp.com/";

export const NaverPoster = async (movieNm) => {
  let value = await axios
    .get(`${CORS}${Naver.posterURL}&query=영화 ${movieNm} 포스터`, {
      headers: NaverOption,
    })
    .then((value) => {
      return String(value.data.items[0].thumbnail).replace(
        "type=b150",
        "type=b400"
      );
    });
  return value;
};

export const NaverCafe = async (title) => {
  let value = await axios
    .get(`${CORS}${Naver.cafeURL}&query=${"영화 후기 " + title}`, {
      headers: NaverOption,
    })
    .then((value) => {
      return value.data.items;
    });
  return value;
};
