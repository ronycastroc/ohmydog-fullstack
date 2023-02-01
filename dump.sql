--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: accounts; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.accounts AS ENUM (
    'Membro',
    'Apoiador',
    'Veterinario'
);


--
-- Name: ages; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ages AS ENUM (
    'Filhote',
    'Adolescente',
    'Adulto',
    'Idoso'
);


--
-- Name: genres; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.genres AS ENUM (
    'Macho',
    'Femea'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adoptionForms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."adoptionForms" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "dogId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: adoptionForms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."adoptionForms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adoptionForms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."adoptionForms_id_seq" OWNED BY public."adoptionForms".id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    comment character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: dogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dogs (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    age public.ages NOT NULL,
    genre public.genres NOT NULL,
    description text NOT NULL,
    "urlImage" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "isUpdated" boolean DEFAULT false NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: stars; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stars (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: stars_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stars_id_seq OWNED BY public.stars.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "urlImage" text NOT NULL,
    "accountType" public.accounts NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: adoptionForms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."adoptionForms" ALTER COLUMN id SET DEFAULT nextval('public."adoptionForms_id_seq"'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dogs ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: stars id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stars ALTER COLUMN id SET DEFAULT nextval('public.stars_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: adoptionForms; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."adoptionForms" VALUES (1, 5, 6, '2023-02-01 08:47:46.901-03', '2023-02-01 08:47:46.901-03');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 1, 1, 'muito legal, bacana', '2023-01-29 17:32:39.273474-03', '2023-01-29 17:32:39.273474-03');
INSERT INTO public.comments VALUES (2, 4, 1, 'ali perto eu acho', '2023-01-29 17:33:05.385799-03', '2023-01-29 17:33:05.385799-03');
INSERT INTO public.comments VALUES (3, 5, 3, 'MIAUUUUUUUUUUUUUUUU', '2023-01-29 17:33:56.81124-03', '2023-01-29 17:33:56.81124-03');
INSERT INTO public.comments VALUES (4, 4, 1, 'ali depois do negocio', '2023-01-31 15:48:10.759-03', '2023-01-31 15:48:10.759-03');
INSERT INTO public.comments VALUES (5, 4, 1, 'eu acho kkkkkkkkkkkkkkkkkkk', '2023-01-31 15:48:43.111-03', '2023-01-31 15:48:43.111-03');
INSERT INTO public.comments VALUES (6, 5, 1, 'MIAUUUUU KKKKKKKKKKKKKKKKK', '2023-01-31 15:51:36.394-03', '2023-01-31 15:51:36.394-03');


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.dogs VALUES (1, 'Fofinho', 'Adolescente', 'Macho', 'muito fofinho e brincalhão', 'https://i0.statig.com.br/bancodeimagens/78/pt/gs/78ptgsfeddfh638dkkzya5p3y.jpg', 3, '2023-01-27 10:06:31.818-03', '2023-01-29 13:15:28.356101-03');
INSERT INTO public.dogs VALUES (2, 'Bonitinha', 'Adolescente', 'Femea', 'Bonitinha pretinha e fofinhan', 'https://i0.wp.com/www.portaldodog.com.br/cachorros/wp-content/uploads/2022/03/caracteristicas-do-vira-lata-2.jpg?resize=563%2C422&ssl=1', 3, '2023-01-27 10:08:02.95-03', '2023-01-29 13:15:28.356101-03');
INSERT INTO public.dogs VALUES (3, 'Qualy', 'Filhote', 'Macho', 'Ama uma manteiguinha', 'https://pbs.twimg.com/media/EXsqlHzXgAQUQXr.jpg:large', 3, '2023-01-27 10:09:08.789-03', '2023-01-29 13:15:28.356101-03');
INSERT INTO public.dogs VALUES (6, 'Olhinho', 'Filhote', 'Macho', 'Fofinho e bonitinho', 'https://cachorrosfofos.com.br/wp-content/uploads/2020/08/cachorro-fofo-vira-lata.jpg', 3, '2023-01-29 11:58:45.216-03', '2023-01-29 14:32:16.296-03');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 3, 'Onde tá rolando campanha de vacinação?', 'Tenho alguns cachorrinhos que resgatei da rua e queria vacinar eles, alguem?', '2023-01-29 16:00:39.376-03', '2023-01-29 16:00:39.376-03', false);
INSERT INTO public.posts VALUES (2, 3, 'Meu cachorro ta miando e agora?', 'Peguei meu cachorro miando, ele virou um gato?', '2023-01-29 16:01:43.126-03', '2023-01-29 16:01:43.126-03', false);
INSERT INTO public.posts VALUES (3, 4, 'Onde tem petisco de graça?', 'Meu dono faz 2 dias que não me da petisco, me ajudaaaaaaaaaaa', '2023-01-29 16:03:07.924-03', '2023-01-29 16:03:07.924-03', false);
INSERT INTO public.posts VALUES (4, 4, 'Corri atrás da moto ontem', 'Alguém tem dicas de como correr atrás de moto sem cansar?', '2023-01-29 16:04:21.275-03', '2023-01-29 16:04:21.275-03', false);
INSERT INTO public.posts VALUES (5, 4, 'AUAUAUAUUA', 'DESCULPA ME EMPOLGUEI', '2023-01-29 16:04:38.362-03', '2023-01-29 16:04:38.362-03', false);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES (3, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY3NDgyMzI2NX0.fKmVcMsJlnzSKYhrowaBH7jQTrYTsVHU8-Kk94wKKfo', '2023-01-27 09:41:05.532-03', '2023-01-29 13:14:56.696239-03');
INSERT INTO public.session VALUES (4, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3NDgyMzMzOX0.TFUl647PkUd5XG6B2vWSXPlBHyrdFfoSp8DtqUYiPmQ', '2023-01-27 09:42:19.794-03', '2023-01-29 13:14:56.696239-03');
INSERT INTO public.session VALUES (5, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY3NTE5MTAzNn0.di29npqCWzZ9e6cp55L8dziY109zZNs-SRRnGi1nomg', '2023-01-31 15:50:36.052-03', '2023-01-31 15:50:36.052-03');


--
-- Data for Name: stars; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.stars VALUES (1, 1, 1, '2023-01-29 17:29:53.571751-03', '2023-01-29 17:29:53.571751-03');
INSERT INTO public.stars VALUES (3, 5, 1, '2023-01-29 17:30:10.146085-03', '2023-01-29 17:30:10.146085-03');
INSERT INTO public.stars VALUES (4, 1, 3, '2023-01-29 17:31:14.949687-03', '2023-01-29 17:31:14.949687-03');
INSERT INTO public.stars VALUES (5, 3, 3, '2023-01-29 17:31:19.778975-03', '2023-01-29 17:31:19.778975-03');
INSERT INTO public.stars VALUES (8, 4, 1, '2023-01-31 13:45:53.68-03', '2023-01-31 13:45:53.68-03');
INSERT INTO public.stars VALUES (9, 4, 5, '2023-01-31 13:47:35.046-03', '2023-01-31 13:47:35.046-03');
INSERT INTO public.stars VALUES (11, 4, 2, '2023-01-31 13:49:00.116-03', '2023-01-31 13:49:00.116-03');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Leticia', 'lele@cucu.com', '$2b$10$ThuJKfKHnugqcmP6vk5AeOZF9brjamqpseQHCHcaWgOLBPIUhKMqO', 'https://scontent.fbhz1-2.fna.fbcdn.net/v/t1.6435-9/140425116_3429994130431636_7921708146253055995_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFu-1J3oOXkZeSnG1xuOkVEv2sLJxWavYC_awsnFZq9gNwyyBBqdkWBY2iNG5V5TJ5PeMIYjhNzSjpF1flE2YTx&_nc_ohc=XvInnOcbCYkAX_8r-Ld&_nc_ht=scontent.fbhz1-2.fna&oh=00_AfD6s5uUgzlJNmt4cJih9KBWA0SVSSkpE7mY26pFiQuTMg&oe=63FB06F8', 'Veterinario', '2023-01-27 07:45:45.937-03', '2023-01-29 13:14:25.821671-03');
INSERT INTO public.users VALUES (3, 'Rony Castro', 'eu@eu.com', '$2b$10$6vFiIGlTLoGzno4ls0F3meg9VVwRBz/3iVDkp/RL7RcXKCEXgqyfq', 'https://static3.tcdn.com.br/img/img_prod/460977/boneco_e_t_dress_up_e_t_o_extraterrestre_neca_cg_42056_1_20201211173001.jpg', 'Apoiador', '2023-01-27 07:47:04.803-03', '2023-01-29 13:14:25.821671-03');
INSERT INTO public.users VALUES (4, 'Miley Auau', 'miley@auau.com', '$2b$10$a1VHkOLrz9wL7OQ86lcCYO9iLoB3HwZiCG0NFHTY9e9ePoARK1Vr2', 'https://www.mundoecologia.com.br/wp-content/uploads/2019/08/Samoieda-6-600x330.jpg', 'Membro', '2023-01-27 07:48:08.44-03', '2023-01-29 13:14:25.821671-03');
INSERT INTO public.users VALUES (5, 'Juju', 'juju@miau.com', '$2b$10$2BEH36vd/uLm7m5fxGnxg.X24G5KeekffZKyVLIK1LCF/4aapIEee', 'https://www.eusemfronteiras.com.br/wp-content/uploads/2022/09/shutterstock_1626424837.jpg', 'Membro', '2023-01-27 07:48:37.407-03', '2023-01-29 13:14:25.821671-03');


--
-- Name: adoptionForms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."adoptionForms_id_seq"', 1, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 7, true);


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dogs_id_seq', 6, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 6, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 5, true);


--
-- Name: stars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stars_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: adoptionForms adoptionForms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."adoptionForms"
    ADD CONSTRAINT "adoptionForms_pkey" PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: stars stars_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT stars_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: adoptionForms adoptionForms_dogId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."adoptionForms"
    ADD CONSTRAINT "adoptionForms_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES public.dogs(id);


--
-- Name: adoptionForms adoptionForms_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."adoptionForms"
    ADD CONSTRAINT "adoptionForms_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: dogs dogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT "dogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: stars stars_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT "stars_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: stars stars_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stars
    ADD CONSTRAINT "stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

