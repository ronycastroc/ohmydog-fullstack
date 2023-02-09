import styled from "styled-components";

export const MainCard = () => {
  return (
    <Display>
      <Wrapper>
        <h1>OHMYDOG! WHO ARE WE?</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, unde ex laborum id, ullam doloribus tempora veniam totam, voluptas ratione ipsa incidunt? Ea, omnis aliquid ullam soluta corrupti saepe pariatur!
        Hic, libero dolor. Cumque aperiam eaque cum blanditiis exercitationem doloremque modi repellat. Ipsa cumque nemo velit error quam mollitia ad sapiente omnis eaque praesentium, dignissimos, consectetur laborum repellendus, quas nesciunt.
        Voluptate quidem hic accusantium assumenda ea repellat perspiciatis dolorum ipsa quaerat architecto blanditiis dolores amet odio, mollitia labore doloremque doloribus culpa vel! Pariatur quos placeat molestiae totam! Ipsa, repudiandae asperiores.
        Velit nesciunt illum nam blanditiis non dolore tenetur adipisci enim nihil dignissimos! Doloribus officiis impedit voluptatibus ea quam reiciendis voluptatem dolores maxime suscipit consequuntur id rerum in laborum, optio officia?</p>
      </Wrapper>
      <Wrapper>
        <h1>OUR MISSION!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestias temporibus esse sunt doloremque earum laboriosam odit quidem nesciunt officia distinctio, debitis perferendis ea, pariatur ut accusantium. Nisi, nam rem.
        Tempore amet quaerat veniam enim mollitia aut excepturi ducimus iste magnam quasi vel dolorum, vero odio nemo similique nam cupiditate beatae facilis laboriosam perspiciatis aspernatur. Nulla reiciendis quisquam eum odit?
        Ullam animi blanditiis doloremque qui perspiciatis, molestiae nobis. Recusandae similique nobis iure nihil qui doloremque officiis quis quo? Qui reprehenderit impedit dignissimos tempore, accusantium nihil nulla sequi corrupti vel harum.
        Illum incidunt saepe quis quas! Quos earum sint, nesciunt illum ipsum dolor in expedita sapiente tenetur qui nulla beatae dicta quae eligendi facilis eaque, excepturi ex quas sit velit aspernatur.</p>
      </Wrapper>
    </Display>
    
  );
};

const Display = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 60vw;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-left: 50px;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30px;

  } 

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 20px;
    color: var(--dark-color);
  }

  p {
    padding: 20px 20px;
    color: var(--dark-color);
  }
`;