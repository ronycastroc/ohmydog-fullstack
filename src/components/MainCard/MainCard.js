import styled from "styled-components";

export const MainCard = () => {
  return (
    <Display>
      <Wrapper>
        <h1>OHMYDOG!!!! QUEM SOMOS?</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, unde ex laborum id, ullam doloribus tempora veniam totam, voluptas ratione ipsa incidunt? Ea, omnis aliquid ullam soluta corrupti saepe pariatur!
        Hic, libero dolor. Cumque aperiam eaque cum blanditiis exercitationem doloremque modi repellat. Ipsa cumque nemo velit error quam mollitia ad sapiente omnis eaque praesentium, dignissimos, consectetur laborum repellendus, quas nesciunt.
        Voluptate quidem hic accusantium assumenda ea repellat perspiciatis dolorum ipsa quaerat architecto blanditiis dolores amet odio, mollitia labore doloremque doloribus culpa vel! Pariatur quos placeat molestiae totam! Ipsa, repudiandae asperiores.
        Velit nesciunt illum nam blanditiis non dolore tenetur adipisci enim nihil dignissimos! Doloribus officiis impedit voluptatibus ea quam reiciendis voluptatem dolores maxime suscipit consequuntur id rerum in laborum, optio officia?
        Laboriosam ex recusandae fuga quod. Consectetur, eum molestiae doloribus sit est dolor accusamus tenetur! Blanditiis provident nam, distinctio maxime reiciendis magni architecto dolores cupiditate quasi deserunt modi qui earum cumque!</p>
      </Wrapper>
      <Wrapper>
        <h1>NOSSA MISSÃO!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat unde beatae optio necessitatibus impedit eos ratione, minima vero dolore, tenetur temporibus ad placeat quibusdam atque, assumenda a maxime libero.
        Earum rem, ullam facilis molestias non veritatis, voluptate quidem placeat animi odio eius! Fugiat harum adipisci assumenda itaque modi ex asperiores beatae, ad quae pariatur illum eos accusamus velit nobis.
        Ipsam repellendus deserunt ea distinctio vitae odit est natus voluptatem itaque, eius consectetur odio enim fugit. Sequi corrupti excepturi deleniti, ratione assumenda, vitae quam corporis expedita quo voluptatem, cupiditate necessitatibus!
        Sapiente magnam cupiditate minima, sint culpa unde adipisci vero corporis accusamus laborum, dolore corrupti exercitationem sequi pariatur aliquam ut id doloremque a. Architecto sequi dolorem, provident alias soluta voluptates doloribus.
        Velit dolores vero modi illum libero voluptatum totam! Similique ducimus distinctio architecto exercitationem officia suscipit dolorum eum odit, perspiciatis, unde natus! Reiciendis inventore consequatur explicabo, corporis officiis suscipit harum tempore!</p>
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
  min-height: 300px;
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