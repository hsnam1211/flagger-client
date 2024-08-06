import "@/App.css";
import "./TestPage.scss";

import { Hnormal } from "@hoosss-test/utils";
import { useEffect } from "react";

function TestPage() {
  const hnormal = new Hnormal();
  const nameListData = [] as any;

  useEffect(() => {
    hnormal.init();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      // 응답이 성공적이지 않은 경우 오류 발생
      if (!response.ok) {
        throw new Error("네트워크 응답이 실패했습니다.");
      }

      const data = await response.json(); // JSON으로 변환
      console.log(data); // 데이터를 콘솔에 출력
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  }
  async function fetchData2() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/hoosss"
      );

      // 응답이 성공적이지 않은 경우 오류 발생
      if (!response.ok) {
        throw new Error("네트워크 응답이 실패했습니다.");
      }

      const data = await response.json(); // JSON으로 변환
      console.log(data); // 데이터를 콘솔에 출력
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  }
  return (
    <section className="TestPage" style={{ color: "#000" }}>
      {/* <h1>{hi("Hoo")}</h1> */}
      <ul>
        {nameListData?.map((data: any, i: number) => {
          return <NameList key={data?.id} data={data} />;
        })}
      </ul>
      <button
        onClick={async () => {
          await fetchData();
        }}
      >
        API
      </button>
      <button
        onClick={async () => {
          await fetchData2();
        }}
      >
        API
      </button>
    </section>
  );
}

export function NameList({ data }: any) {
  return <li>{data?.name}</li>;
}

export default TestPage;
