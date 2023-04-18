import axios from "axios";
import Kobis from "../KeyFile/Kobis.json";
import { NaverPoster } from "./NaverAPI";

export const KobisDaily = async (fulldate) => {
  let dailyData = await axios
    .get(`${Kobis.DailyURL}${Kobis.Key}&targetDt=${fulldate}`)
    .then((value) => {
      return value.data.boxOfficeResult.dailyBoxOfficeList;
    });
  [...dailyData].forEach((tag) => {
    NaverPoster(tag.movieNm).then((value) => {
      tag.poster = value;
    });
  });
  return dailyData;
};

export const KobisSearch = async (movieNm) => {
  let value = await axios
    .get(`${Kobis.SearchURL}${Kobis.Key}&movieNm=${movieNm}`)
    .then((value) => {
      return value.data.movieListResult;
    });
  return value;
};

export const KobisInfo = async (movieCd) => {
  let value = await axios
    .get(`${Kobis.InfoURL}${Kobis.Key}&movieCd=${movieCd}`)
    .then((value) => {
      return value.data.movieInfoResult.movieInfo;
    });
  return value;
};
