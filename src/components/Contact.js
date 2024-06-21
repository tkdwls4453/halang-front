import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <ContactWrap>
      <a href='https://m.booking.naver.com/booking/6/bizes/1034066?theme=place&entry=pll&area=pll'>
        견적문의 및 예약하기
      </a>
      <p>
        E<br/>
        halanginterior@naver.com<br/>
        <br/>
        T<br/>
        010. 3690. 9407<br/>
        <br/>
        A<br/>
        경기도 성남시 수정구 위례광장로328, 우성위례타워 805호 <br/>
        805 Woosung Wirye Tower, 328 Wiryegwangjang-ro, Sujeong-gu, Seongnam-si, Gyeonggi-do <br/>
      </p>
    </ContactWrap>
  );
};

export default Contact;

const ContactWrap = styled.div`
  position: relative; /* display: absolute;는 유효하지 않으므로 제거 또는 수정 */
  margin-top: 150px;
  height: 50vh;
  
  padding-top: 60px;
  text-align: left; /* 콘텐츠를 왼쪽으로 정렬 */
  p{
    margin-top: 50px;
    line-height: 25px;
    font-size: 0.8rem;
  }

  a{
    color: inherit;

    &:hover {
      color: #136AB2
    }
  }
`;
