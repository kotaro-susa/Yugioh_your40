import { useEffect, useState } from "react";
import "./App.css";
import { instance } from "./utils/yugioh";
import { Card } from "./Card/Card";

function App() {
  const [yugiohData, setYugiohData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchYugiohData = async () => {
      try {
        // カード情報を全て得る(他の処理を止める)
        const res = await instance.get();
        // console.log(res.data.data[0]);
        // 得た情報からURLを獲得し、配列に入れる(他の処理を止める)
        await loadYugioh(res.data.data);
        // const res_image = res.data.data[0].card_images[0].image_url;
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchYugiohData();
  }, []);

  // 1.URLを抽出　2.抽出したURLを配列に含める
  const loadYugioh = async (data) => {
    try {
      const _yugiohData = await Promise.all(
        data.map(async (card) => {
          let yugiohfrontRecord = await card.card_images[0].image_url;
          return yugiohfrontRecord;
        })
      );
      // 配列の要素数を減らし、中身をシャッフルする
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      const shuffledData = shuffleArray(_yugiohData);
      const displayCardData = shuffledData.slice(0,40);
      setYugiohData(displayCardData);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   console.log(yugiohData);
  // }, [yugiohData]);
  return (
    <div className="App">
      {loading ? (
        <h1>ロード中</h1>
      ) : (
        <div className="Card-container">
          {yugiohData.map((imageURL, index) => {
            return <Card key={index} imageURL={imageURL} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
