# 天気 + 時刻アプリ

React + TypeScript の学習用に手書きで実装したシンプルな天気・時刻表示アプリ。

---

## アプリの概要

札幌の現在時刻と天気情報をリアルタイムで表示する。

- 現在時刻を毎秒更新して表示
- Open-Meteo API（無料・APIキー不要）から気温・天気・風速を取得
- ローディング中・エラー時の状態表示に対応

---

## 取り組み方

このアプリはAIにコードを生成させてコピペしたものではなく、**自分の手でゼロから設計・実装した**。

### 進め方
1. ファイル構成を自分で設計する
2. 各ファイルの責務を言葉で説明してから実装する
3. 書いたコードが何をしているか、自分の言葉で説明できることを確認する

### なぜ手書きにこだわるか
「AIが出したコードを評価・判断できるエンジニア」を目指しているため。  
自分で一度書いたことがあるコードでないと、AIの出力が正しいかどうか判断できない。  
手書きすることで「書ける感覚」を作り、それを評価の基準にする。

---

## 学んだこと

### APIを叩くときの鉄板パターン
APIを叩くとき、処理には必ず3つの状態がある。

```ts
const [data, setData] = useState<null | CurrentWeather>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<null | string>(null);
```

これがないとユーザーに状態を伝えられない。APIを叩くたびにこの3つはセットで必要。

### ネストしたオブジェクトの型定義
内側から外側の順番で定義する。

```ts
interface CurrentWeather {
  temperature: number;
  weathercode: number;
  windspeed: number;
}

interface Res {
  current_weather: CurrentWeather;
}
```

### 現在時刻の取得
JavaScriptの組み込み機能 `new Date()` で取得できる。APIは不要。

```ts
// カウントダウン（今の値を元に計算）
setTime(prev => prev - 1);

// 現在時刻（外から新しい値を取ってくる）
setTime(new Date());
```

### useRef + setInterval のパターン
① stateで管理する値を定義  
② useRefにsetIntervalのIDを入れる箱を作る  
③ useEffectで起動・クリーンアップを書く

```ts
const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

useEffect(() => {
  intervalRef.current = setInterval(() => {
    setTime(new Date());
  }, 1000);
  return () => {
    clearInterval(intervalRef.current);
  };
}, []);
```

### thenチェーン vs async/await
やってることは同じ、書き方が違うだけ。

```ts
// thenチェーン
fetch(API)
  .then(res => res.json())
  .then(json => setData(json.current_weather))
  .catch(e => setError('失敗しました'))
  .finally(() => setLoading(false));

// async/await
async function fetchWeather() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    setData(json.current_weather);
  } catch(e) {
    setError('失敗しました');
  } finally {
    setLoading(false);
  }
}
```

---

## 使用技術

- React + TypeScript + Vite
- Open-Meteo API（天気データ）
- StackBlitz（開発環境）