import styled from "styled-components";

export const MainCard = () => {
  return (
    <Display>
      <Wrapper>
        <h1>OHMYDOG! WHO ARE WE?</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, unde ex laborum id, ullam doloribus tempora veniam totam, voluptas ratione ipsa incidunt? Ea, omnis aliquid ullam soluta corrupti saepe pariatur!
        Hic, libero dolor. Cumque aperiam eaque cum blanditiis exercitationem doloremque modi repellat. Ipsa cumque nemo velit error quam mollitia ad sapiente omnis eaque praesentium, dignissimos, consectetur laborum repellendus, quas nesciunt.
        Voluptate quidem hic accusantium assumenda ea repellat perspiciatis dolorum ipsa quaerat architecto blanditiis dolores amet odio, mollitia labore doloremque doloribus culpa vel! Pariatur quos placeat molestiae totam! Ipsa, repudiandae asperiores.
        Velit nesciunt illum nam blanditiis non dolore tenetur adipisci enim nihil dignissimos! Doloribus officiis impedit voluptatibus ea quam reiciendis voluptatem dolores maxime suscipit consequuntur id rerum in laborum, optio officia?
        Laboriosam ex recusandae fuga quod. Consectetur, eum molestiae doloribus sit est dolor accusamus tenetur! Blanditiis provident nam, distinctio maxime reiciendis magni architecto dolores cupiditate quasi deserunt modi qui earum cumque!</p>
      </Wrapper>
      <Wrapper>
        <h1>OUR MISSION!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestias temporibus esse sunt doloremque earum laboriosam odit quidem nesciunt officia distinctio, debitis perferendis ea, pariatur ut accusantium. Nisi, nam rem.
        Tempore amet quaerat veniam enim mollitia aut excepturi ducimus iste magnam quasi vel dolorum, vero odio nemo similique nam cupiditate beatae facilis laboriosam perspiciatis aspernatur. Nulla reiciendis quisquam eum odit?
        Ullam animi blanditiis doloremque qui perspiciatis, molestiae nobis. Recusandae similique nobis iure nihil qui doloremque officiis quis quo? Qui reprehenderit impedit dignissimos tempore, accusantium nihil nulla sequi corrupti vel harum.
        Illum incidunt saepe quis quas! Quos earum sint, nesciunt illum ipsum dolor in expedita sapiente tenetur qui nulla beatae dicta quae eligendi facilis eaque, excepturi ex quas sit velit aspernatur.
        Autem aut sequi architecto nemo excepturi commodi vel dolor repudiandae est, quaerat dolorum saepe ab exercitationem vitae reiciendis nostrum delectus maiores numquam error esse? Optio fugit repellendus laudantium doloribus praesentium?
        Vitae provident fuga eos, quia illum nulla quo maxime? Veritatis esse odit similique. Exercitationem vero, necessitatibus repudiandae excepturi quod laboriosam repellendus ad. Cum voluptatum quibusdam et tenetur! Quia, quidem consequuntur!</p>
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
  border-radius: 40px;
  margin-bottom: 30px;

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 20px;
    color: var(--dark-color);
  }

  p {
    padding: 15px 20px;
    color: var(--dark-color);
  }
`;