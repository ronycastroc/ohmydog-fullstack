import styled from "styled-components";

export const AdoptCard = () => {
  return (
    <div>
      <Card>
        <h1>Why adopt a dog?</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aut pariatur temporibus asperiores non enim tenetur, totam labore natus harum iure delectus nostrum, ea molestias minus a repudiandae illo. Magnam!
        Voluptatum molestias iusto ut itaque, impedit aut reprehenderit adipisci tenetur fuga, dicta, nihil consectetur maxime iste debitis rem quam. Officia iusto perferendis, totam tempore magni modi officiis vero natus autem!
        Corrupti quia maiores, itaque modi architecto optio ad. Fugiat deserunt quibusdam repudiandae modi alias in perferendis obcaecati pariatur. Facere enim placeat quod esse illum laborum officia ipsum aspernatur inventore laudantium?
        Nulla assumenda sunt officiis hic sit blanditiis rem, est, adipisci iure magnam facere minima sint fugiat quos. Earum minus dolor, repellendus, numquam maxime perferendis eius unde officia adipisci aut veritatis!</p>
      </Card>
    </div>        
  );
};

const Card = styled.div`
  background-color: var(--white-color);
  width: 30vw;  
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

