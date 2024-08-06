import Badge from "@/components/Badge/Badge";
import Button from "@/components/Button/Button";
import InputBox from "@/components/InputBox/InputBox";
import OutlineBox from "@/components/OutlineBox/OutlineBox";

function NotFound() {
  return (
    <>
      <div>Not Found</div>
      <div className="buttons">
        <Button type="a">모든 제품 보러가기</Button>
        <Button type="b">BUTTON</Button>
        <Button type="c">BUTTON</Button>
        <Button type="d">BUTTON</Button>
      </div>
      <div className="buttons">
        <Badge color="wait" round>
          대기
        </Badge>
        <Badge color="reject">반려</Badge>
        <Badge color="progress">진행</Badge>
        <Badge style={{ background: "#FFD600" }}>진행</Badge>
        <Badge color="progress">P</Badge>
      </div>
      <div className="buttons">
        <OutlineBox>
          <InputBox title="브랜드 태그 등록" input={false}>
            <div className="hh">카테고리(대)</div>
            <div className="hh">카테고리(중)</div>
            <div className="hh">카테고리(소)</div>
          </InputBox>
        </OutlineBox>
        <OutlineBox fullWidth flexDirection="column">
          <InputBox placeholder="hi" title="브랜드 태그 등록"></InputBox>
          <hr />
          <InputBox title="브랜드 태그 등록"></InputBox>
        </OutlineBox>
        <OutlineBox fullWidth>
          <InputBox
            at={true}
            placeholder="ex) stylemate_official"
            title="인스타그램"
          ></InputBox>
        </OutlineBox>
      </div>
      <div className="buttons">
        <OutlineBox></OutlineBox>
      </div>
    </>
  );
}

export default NotFound;
