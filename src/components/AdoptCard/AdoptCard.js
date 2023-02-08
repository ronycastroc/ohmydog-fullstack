import styled from "styled-components";
import { AddDogButton } from "../AddDogButton/AddDogButton";

export const AdoptCard = () => {
  return (
    <DisplayCard>
      <Card>
        <h1>Why adopt a dog?</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aut pariatur temporibus asperiores non enim tenetur, totam labore natus harum iure delectus nostrum, ea molestias minus a repudiandae illo. Magnam!
          Voluptatum molestias iusto ut itaque, impedit aut reprehenderit adipisci tenetur fuga, dicta, nihil consectetur maxime iste debitis rem quam. Officia iusto perferendis, totam tempore magni modi officiis vero natus autem!
          Corrupti quia maiores, itaque modi architecto optio ad. Fugiat deserunt quibusdam repudiandae modi alias in perferendis obcaecati pariatur. Facere enim placeat quod esse illum laborum officia ipsum aspernatur inventore laudantium?
          Nulla assumenda sunt officiis hic sit blanditiis rem, est, adipisci iure magnam facere minima sint fugiat quos. Earum minus dolor, repellendus, numquam maxime perferendis eius unde officia adipisci aut veritatis!</p>
      </Card>
      <Card>
        <h1>Adopting is a gesture of love</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, corporis laboriosam. Facilis voluptate delectus reprehenderit labore repudiandae natus. Molestiae sapiente deserunt similique praesentium iure vitae, excepturi iusto esse laboriosam placeat?
          Quae necessitatibus deleniti, culpa magni natus repellendus dolor quod labore quibusdam voluptas ad nulla architecto suscipit animi, atque excepturi dignissimos tempore velit deserunt mollitia accusamus vel adipisci provident. Nisi, nam?
          Ut ducimus animi necessitatibus, optio labore voluptatibus repudiandae deleniti natus atque veniam eveniet iure officiis doloribus incidunt ullam officia neque? Odio suscipit ipsa nulla deleniti neque eius a qui nisi.
          Nesciunt vitae at, tempora eaque possimus amet, culpa adipisci quibusdam ab porro unde laudantium recusandae. Nisi doloribus possimus temporibus incidunt beatae quia. Eius, nam veniam. Cum esse minima nulla facere!</p>
      </Card>

      <AddDogButton />
    </DisplayCard>
  );
};

const DisplayCard = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-top: -10px;
  }
`;

const Card = styled.div`
  background-color: var(--white-color);
  width: 35vw;  
  border-radius: 10px;
  margin-right: 30px;
  margin-bottom: 30px;

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

