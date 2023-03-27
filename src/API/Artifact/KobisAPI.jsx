import axios from "axios";
import Kobis from "../KeyFile/Kobis.json";
import { NaverPoster } from "./NaverAPI";

export const KobisDaily = async (fulldate) => {
  let dailyData = await axios
    .get(`${Kobis.DailyURL}${Kobis.Key}&targetDt=${fulldate}`)
    .then((value) => {
      return value.data.boxOfficeResult.dailyBoxOfficeList;
    });
  NaverPoster(dailyData[0].movieNm).then((value) => {
    dailyData[0].poster = value;
  });
  NaverPoster(dailyData[1].movieNm).then((value) => {
    dailyData[1].poster = value;
  });
  NaverPoster(dailyData[2].movieNm).then((value) => {
    dailyData[2].poster = value;
  });
  NaverPoster(dailyData[3].movieNm).then((value) => {
    dailyData[3].poster = value;
  });
  NaverPoster(dailyData[4].movieNm).then((value) => {
    dailyData[4].poster = value;
  });
  NaverPoster(dailyData[5].movieNm).then((value) => {
    dailyData[5].poster = value;
  });
  NaverPoster(dailyData[6].movieNm).then((value) => {
    dailyData[6].poster = value;
  });
  NaverPoster(dailyData[7].movieNm).then((value) => {
    dailyData[7].poster = value;
  });
  NaverPoster(dailyData[8].movieNm).then((value) => {
    dailyData[8].poster = value;
  });
  NaverPoster(dailyData[9].movieNm).then((value) => {
    dailyData[9].poster = value;
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
