import styled from "styled-components";

export const MainCard = () => {
  return (
    <Wrapper>
      <h1>OHMYDOG!!!! NOSSA MISSÃO!</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, unde ex laborum id, ullam doloribus tempora veniam totam, voluptas ratione ipsa incidunt? Ea, omnis aliquid ullam soluta corrupti saepe pariatur!
      Hic, libero dolor. Cumque aperiam eaque cum blanditiis exercitationem doloremque modi repellat. Ipsa cumque nemo velit error quam mollitia ad sapiente omnis eaque praesentium, dignissimos, consectetur laborum repellendus, quas nesciunt.
      Voluptate quidem hic accusantium assumenda ea repellat perspiciatis dolorum ipsa quaerat architecto blanditiis dolores amet odio, mollitia labore doloremque doloribus culpa vel! Pariatur quos placeat molestiae totam! Ipsa, repudiandae asperiores.
      Velit nesciunt illum nam blanditiis non dolore tenetur adipisci enim nihil dignissimos! Doloribus officiis impedit voluptatibus ea quam reiciendis voluptatem dolores maxime suscipit consequuntur id rerum in laborum, optio officia?
      Laboriosam ex recusandae fuga quod. Consectetur, eum molestiae doloribus sit est dolor accusamus tenetur! Blanditiis provident nam, distinctio maxime reiciendis magni architecto dolores cupiditate quasi deserunt modi qui earum cumque!</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 40vw;
  min-height: 230px;
  border-radius: 40px;

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