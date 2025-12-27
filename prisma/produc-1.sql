--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 16.0

-- Started on 2025-12-27 19:09:21 MSK

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
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16538)
-- Name: nsi_questions_categories; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_questions_categories (
    id integer NOT NULL,
    category character varying NOT NULL
);


ALTER TABLE public.nsi_questions_categories OWNER TO CURRENT_USER;

--
-- TOC entry 203 (class 1259 OID 16544)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3096 (class 0 OID 0)
-- Dependencies: 203
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.nsi_questions_categories.id;


--
-- TOC entry 204 (class 1259 OID 16546)
-- Name: nsi_images; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_images (
    id integer NOT NULL,
    image character varying NOT NULL,
    image_alt character varying NOT NULL,
    width integer,
    height integer,
    "order" integer
);


ALTER TABLE public.nsi_images OWNER TO CURRENT_USER;

--
-- TOC entry 205 (class 1259 OID 16552)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3097 (class 0 OID 0)
-- Dependencies: 205
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.nsi_images.id;


--
-- TOC entry 206 (class 1259 OID 16554)
-- Name: nsi_filter_budgets; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_filter_budgets (
    id integer NOT NULL,
    min_value integer,
    max_value integer,
    caption character varying NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.nsi_filter_budgets OWNER TO CURRENT_USER;

--
-- TOC entry 207 (class 1259 OID 16560)
-- Name: nsi_budget_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_budget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_budget_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3098 (class 0 OID 0)
-- Dependencies: 207
-- Name: nsi_budget_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_budget_id_seq OWNED BY public.nsi_filter_budgets.id;


--
-- TOC entry 209 (class 1259 OID 16568)
-- Name: nsi_filter_colors; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_filter_colors (
    id integer NOT NULL,
    name character varying NOT NULL,
    caption character varying NOT NULL,
    type character varying NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.nsi_filter_colors OWNER TO CURRENT_USER;

--
-- TOC entry 210 (class 1259 OID 16574)
-- Name: nsi_colors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_colors_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3099 (class 0 OID 0)
-- Dependencies: 210
-- Name: nsi_colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_colors_id_seq OWNED BY public.nsi_filter_colors.id;


--
-- TOC entry 208 (class 1259 OID 16562)
-- Name: nsi_colors; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_colors (
    id integer DEFAULT nextval('public.nsi_colors_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    caption character varying NOT NULL,
    hex_code character varying NOT NULL,
    caption_code character varying
);


ALTER TABLE public.nsi_colors OWNER TO CURRENT_USER;

--
-- TOC entry 211 (class 1259 OID 16576)
-- Name: nsi_colors_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_colors_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_colors_id_seq1 OWNER TO CURRENT_USER;

--
-- TOC entry 3100 (class 0 OID 0)
-- Dependencies: 211
-- Name: nsi_colors_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_colors_id_seq1 OWNED BY public.nsi_colors.id;


--
-- TOC entry 226 (class 1259 OID 24755)
-- Name: nsi_filter_budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_filter_budgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_filter_budgets_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3101 (class 0 OID 0)
-- Dependencies: 226
-- Name: nsi_filter_budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_filter_budgets_id_seq OWNED BY public.nsi_filter_budgets.id;


--
-- TOC entry 227 (class 1259 OID 24758)
-- Name: nsi_filter_colors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_filter_colors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_filter_colors_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3102 (class 0 OID 0)
-- Dependencies: 227
-- Name: nsi_filter_colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_filter_colors_id_seq OWNED BY public.nsi_filter_colors.id;


--
-- TOC entry 212 (class 1259 OID 16578)
-- Name: nsi_filter_layouts; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_filter_layouts (
    id integer NOT NULL,
    name character varying NOT NULL,
    caption character varying NOT NULL,
    type character varying NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.nsi_filter_layouts OWNER TO CURRENT_USER;

--
-- TOC entry 228 (class 1259 OID 24761)
-- Name: nsi_filter_layouts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_filter_layouts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_filter_layouts_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3103 (class 0 OID 0)
-- Dependencies: 228
-- Name: nsi_filter_layouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_filter_layouts_id_seq OWNED BY public.nsi_filter_layouts.id;


--
-- TOC entry 225 (class 1259 OID 24681)
-- Name: nsi_filter_styles; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_filter_styles (
    id integer NOT NULL,
    name character varying NOT NULL,
    caption character varying NOT NULL,
    type character varying NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.nsi_filter_styles OWNER TO CURRENT_USER;

--
-- TOC entry 224 (class 1259 OID 24679)
-- Name: nsi_filter_styles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_filter_styles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_filter_styles_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3104 (class 0 OID 0)
-- Dependencies: 224
-- Name: nsi_filter_styles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_filter_styles_id_seq OWNED BY public.nsi_filter_styles.id;


--
-- TOC entry 213 (class 1259 OID 16584)
-- Name: nsi_filter_types; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.nsi_filter_types (
    id integer NOT NULL,
    name character varying NOT NULL,
    caption character varying NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.nsi_filter_types OWNER TO CURRENT_USER;

--
-- TOC entry 229 (class 1259 OID 24764)
-- Name: nsi_filter_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_filter_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_filter_types_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3105 (class 0 OID 0)
-- Dependencies: 229
-- Name: nsi_filter_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_filter_types_id_seq OWNED BY public.nsi_filter_types.id;


--
-- TOC entry 230 (class 1259 OID 24767)
-- Name: nsi_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_images_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3106 (class 0 OID 0)
-- Dependencies: 230
-- Name: nsi_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_images_id_seq OWNED BY public.nsi_images.id;


--
-- TOC entry 231 (class 1259 OID 24770)
-- Name: nsi_questions_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_questions_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_questions_categories_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3107 (class 0 OID 0)
-- Dependencies: 231
-- Name: nsi_questions_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_questions_categories_id_seq OWNED BY public.nsi_questions_categories.id;


--
-- TOC entry 214 (class 1259 OID 16590)
-- Name: nsi_styles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_styles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_styles_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 214
-- Name: nsi_styles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_styles_id_seq OWNED BY public.nsi_filter_layouts.id;


--
-- TOC entry 215 (class 1259 OID 16592)
-- Name: nsi_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.nsi_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nsi_types_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 215
-- Name: nsi_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.nsi_types_id_seq OWNED BY public.nsi_filter_types.id;


--
-- TOC entry 216 (class 1259 OID 16594)
-- Name: portfolio; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.portfolio (
    id integer NOT NULL,
    type integer,
    sizes_room character varying,
    sizes_furniture character varying,
    housing_material character varying,
    facade_material character varying,
    table_top_material character varying,
    body_color integer,
    table_top_color integer,
    furniture_accessories character varying,
    name character varying NOT NULL,
    title character varying NOT NULL,
    layout integer,
    price integer NOT NULL,
    description character varying,
    style integer
);


ALTER TABLE public.portfolio OWNER TO CURRENT_USER;

--
-- TOC entry 217 (class 1259 OID 16600)
-- Name: portfolio_colors_list; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.portfolio_colors_list (
    id integer NOT NULL,
    work integer,
    color integer
);


ALTER TABLE public.portfolio_colors_list OWNER TO CURRENT_USER;

--
-- TOC entry 218 (class 1259 OID 16603)
-- Name: portfolio_colors_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.portfolio_colors_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_colors_list_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3110 (class 0 OID 0)
-- Dependencies: 218
-- Name: portfolio_colors_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.portfolio_colors_list_id_seq OWNED BY public.portfolio_colors_list.id;


--
-- TOC entry 219 (class 1259 OID 16605)
-- Name: portfolio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.portfolio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3111 (class 0 OID 0)
-- Dependencies: 219
-- Name: portfolio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.portfolio_id_seq OWNED BY public.portfolio.id;


--
-- TOC entry 220 (class 1259 OID 16607)
-- Name: portfolio_images_list; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.portfolio_images_list (
    id integer NOT NULL,
    work integer,
    image integer
);


ALTER TABLE public.portfolio_images_list OWNER TO CURRENT_USER;

--
-- TOC entry 221 (class 1259 OID 16610)
-- Name: portfolio_images_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.portfolio_images_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_images_list_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 221
-- Name: portfolio_images_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.portfolio_images_list_id_seq OWNED BY public.portfolio_images_list.id;


--
-- TOC entry 222 (class 1259 OID 16612)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    question character varying NOT NULL,
    "categoryId" integer,
    question_description character varying NOT NULL
);


ALTER TABLE public.questions OWNER TO CURRENT_USER;

--
-- TOC entry 223 (class 1259 OID 16618)
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO CURRENT_USER;

--
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- TOC entry 2890 (class 2604 OID 24809)
-- Name: nsi_filter_budgets id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_budgets ALTER COLUMN id SET DEFAULT nextval('public.nsi_filter_budgets_id_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 24810)
-- Name: nsi_filter_colors id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_colors ALTER COLUMN id SET DEFAULT nextval('public.nsi_filter_colors_id_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 24811)
-- Name: nsi_filter_layouts id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_layouts ALTER COLUMN id SET DEFAULT nextval('public.nsi_filter_layouts_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 24684)
-- Name: nsi_filter_styles id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_styles ALTER COLUMN id SET DEFAULT nextval('public.nsi_filter_styles_id_seq'::regclass);


--
-- TOC entry 2894 (class 2604 OID 24812)
-- Name: nsi_filter_types id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_types ALTER COLUMN id SET DEFAULT nextval('public.nsi_filter_types_id_seq'::regclass);


--
-- TOC entry 2889 (class 2604 OID 24813)
-- Name: nsi_images id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_images ALTER COLUMN id SET DEFAULT nextval('public.nsi_images_id_seq'::regclass);


--
-- TOC entry 2888 (class 2604 OID 24814)
-- Name: nsi_questions_categories id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_questions_categories ALTER COLUMN id SET DEFAULT nextval('public.nsi_questions_categories_id_seq'::regclass);


--
-- TOC entry 2895 (class 2604 OID 16627)
-- Name: portfolio id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio ALTER COLUMN id SET DEFAULT nextval('public.portfolio_id_seq'::regclass);


--
-- TOC entry 2896 (class 2604 OID 16628)
-- Name: portfolio_colors_list id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_colors_list ALTER COLUMN id SET DEFAULT nextval('public.portfolio_colors_list_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 16629)
-- Name: portfolio_images_list id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_images_list ALTER COLUMN id SET DEFAULT nextval('public.portfolio_images_list_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 16630)
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- TOC entry 3066 (class 0 OID 16562)
-- Dependencies: 208
-- Data for Name: nsi_colors; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_colors (id, name, caption, hex_code, caption_code) FROM stdin;
1	white	Белый	#FAFAFA	code
2	black	Черный	#0A0A0A	code
3	yellow	Желтый	#EFCE7E	code
4	gray	Серый	#58595B	code
5	brown	Коричневый	#7A553D	code
6	green	Зеленый	#00A651	code
7	blue	Синий	#0099FF	code
\.


--
-- TOC entry 3064 (class 0 OID 16554)
-- Dependencies: 206
-- Data for Name: nsi_filter_budgets; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_filter_budgets (id, min_value, max_value, caption, name, type, "order") FROM stdin;
5	300000	600000	От 300 до 600 тыс. руб.	300to600	budget	2
8	600000	1200000	От 600 до 1.2 млн. руб.	600to1200	budget	3
6	0	300000	До 300 тыс.руб.	to300	budget	1
7	1200000	0	От 1,2 млн руб.	from1200	budget	4
\.


--
-- TOC entry 3067 (class 0 OID 16568)
-- Dependencies: 209
-- Data for Name: nsi_filter_colors; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_filter_colors (id, name, caption, type, "order") FROM stdin;
7	bright	Мебель в светлых тонах	color	1
8	dark	Мебель в темных тонах	color	2
9	mixed	Смешанные цвета	color	3
10	countrast	Контрастные цвета	color	4
\.


--
-- TOC entry 3070 (class 0 OID 16578)
-- Dependencies: 212
-- Data for Name: nsi_filter_layouts; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_filter_layouts (id, name, caption, type, "order") FROM stdin;
6	twoway	Двухсторонняя	layout	4
7	other	Другое	layout	5
8	direct	Прямая	layout	1
9	angular	Угловая	layout	2
10	ushaped	П-образная	layout	3
\.


--
-- TOC entry 3083 (class 0 OID 24681)
-- Dependencies: 225
-- Data for Name: nsi_filter_styles; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_filter_styles (id, name, caption, type, "order") FROM stdin;
1	minimalism	Минимализм	style	1
2	classic	Классика	style	2
3	modern	Современный	style	3
\.


--
-- TOC entry 3071 (class 0 OID 16584)
-- Dependencies: 213
-- Data for Name: nsi_filter_types; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_filter_types (id, name, caption, type) FROM stdin;
22	kitchens	Кухня	type
23	wardrobes	Шкафы	type
24	wardrobescupe	Шкафы-купе	type
25	dressingrooms	Гардеробные	type
26	entrancehalls	Прихожие	type
27	livingfurniture	Мебель в гостиную	type
28	bathroomfurniture	Мебель для ванной	type
29	nurseryfurniture	Мебель для детской	type
30	officefurniture	Офисная мебель	type
31	other	Другое	type
\.


--
-- TOC entry 3062 (class 0 OID 16546)
-- Dependencies: 204
-- Data for Name: nsi_images; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_images (id, image, image_alt, width, height, "order") FROM stdin;
4	portfolio/fiol_kitchen/880f97373684474afe32520b66d0ed15542b56f4.jpg	Фиолетовая кухня	200	300	1
5	portfolio/graphit_and_table/8149f58189b3a11dcfde64b21f267191c76d886b.jpg	Графит и тумба	200	300	1
6	portfolio/white_kitchen/b9f9499337a77c7865bfc0ef0eba26f57b157b88.jpg	Белая кухня	200	300	2
7	portfolio/white_kitchen/6d41385fb6bef8b709bdc8431093f6544ddc0667.jpg	Белая кухня	200	300	3
8	portfolio/white_kitchen/cdcfa2efd2a2578216bf8558dd29fe5986b815ac.jpg	Белая кухня	200	300	4
3	portfolio/white_kitchen/6949ed8a18efbf26b2083c1fd611cba92117710d.jpg	Белая кухня	200	300	1
\.


--
-- TOC entry 3060 (class 0 OID 16538)
-- Dependencies: 202
-- Data for Name: nsi_questions_categories; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.nsi_questions_categories (id, category) FROM stdin;
1	Категория 1
2	Категория 2
\.


--
-- TOC entry 3074 (class 0 OID 16594)
-- Dependencies: 216
-- Data for Name: portfolio; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.portfolio (id, type, sizes_room, sizes_furniture, housing_material, facade_material, table_top_material, body_color, table_top_color, furniture_accessories, name, title, layout, price, description, style) FROM stdin;
8	22	2 комнаты	третий размер	хаус материал 1	фасад	материал стола	2	1	аксессуары	white_kitchen	Белая	9	300000	<table class="lexkit-table"><colgroup><col><col></colgroup><tbody><tr class="lexkit-table-row"><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><figure class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"><img src="http://localhost:3001/images/portfolio/white_kitchen/b9f9499337a77c7865bfc0ef0eba26f57b157b88.jpg" alt="b9f9499337a77c7865bfc0ef0eba26f57b157b88.jpg" class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"></figure></p></td><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">Тёплая бежевая палитра матовых фасадов с деликатной текстурой льна создаёт атмосферу спокойствия, а натуральные акценты деревянных элементов добавляют интерьеру природную гармонию. Столешница из кварцевого агломерата с мягким бетонным отливом не просто красива – она устойчива к пятнам и нагреву, сохраняя безупречный вид годами.</span></p><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">Эргономика продумана до мелочей: угловой модуль с карусельным механизмом скрывает вместительные системы хранения, а остров с барной стойкой становится и местом для завтраков, и дополнительным рабочим пространством. Встроенная техника Siemens, включая варочную панель и пароварку, спрятана за фасадами, сохраняя чистоту линий.</span></p></td></tr><tr class="lexkit-table-row"><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">По вечерам кухня преображается: скрытая LED-подсветка мягко подсвечивает фартук из керамогранита с эффектом «размытого песка» и создаёт уютное ambient-освещение. А закруглённый край столешницы – наша забота о безопасности, особенно важная для семей с детьми.</span></p><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">Этот проект – для тех, кто ценит не только красоту, но и осмысленный комфорт. Для пространств, где каждая деталь работает на ваше удовольствие от готовки и общения.</span></p></td><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><figure class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"><img src="http://localhost:3001/images/portfolio/white_kitchen/cdcfa2efd2a2578216bf8558dd29fe5986b815ac.jpg" alt="cdcfa2efd2a2578216bf8558dd29fe5986b815ac.jpg" class="lexical-image align-left" style="text-align: left; margin: 1rem 0px; display: block;"></figure><figure class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"><img src="http://localhost:3001/images/portfolio/white_kitchen/6d41385fb6bef8b709bdc8431093f6544ddc0667.jpg" alt="6d41385fb6bef8b709bdc8431093f6544ddc0667.jpg" class="lexical-image align-right" style="text-align: right; margin: 1rem 0px; display: block;"></figure></p></td></tr><tr class="lexkit-table-row"><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><figure class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"><img src="http://localhost:3001/images/portfolio/white_kitchen/6949ed8a18efbf26b2083c1fd611cba92117710d.jpg" alt="6949ed8a18efbf26b2083c1fd611cba92117710d.jpg" class="lexical-image align-center" style="text-align: center; margin: 1rem 0px; display: block;"></figure></p></td><td style="width: 75px; border: 1px solid black; vertical-align: top; text-align: start;" class="lexkit-table-cell"><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">По вечерам кухня преображается: скрытая LED-подсветка мягко подсвечивает фартук из керамогранита с эффектом «размытого песка» и создаёт уютное ambient-освещение. А закруглённый край столешницы – наша забота о безопасности, особенно важная для семей с детьми.</span></p><p class="lexkit-paragraph" style="text-align: start;"><span style="white-space: pre-wrap;">Этот проект – для тех, кто ценит не только красоту, но и осмысленный комфорт. Для пространств, где каждая деталь работает на ваше удовольствие от готовки и общения.</span></p></td></tr></tbody></table>	2
9	22	2 комнаты	третий размер	хаус материал 1	фасад	материал стола	1	5	аксессуары	fiol_kitchen	Фиолетовая	10	700000	test desc2	1
10	23	2 комнаты	третий размер	хаус материал 1	фасад	материал стола	4	5	аксессуары	graphit_and_table	Графит и тумба	7	500000	test desc2	1
\.


--
-- TOC entry 3075 (class 0 OID 16600)
-- Dependencies: 217
-- Data for Name: portfolio_colors_list; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.portfolio_colors_list (id, work, color) FROM stdin;
3	8	2
4	9	1
\.


--
-- TOC entry 3078 (class 0 OID 16607)
-- Dependencies: 220
-- Data for Name: portfolio_images_list; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.portfolio_images_list (id, work, image) FROM stdin;
2	8	3
3	9	4
4	8	6
5	8	7
6	8	8
7	10	5
\.


--
-- TOC entry 3080 (class 0 OID 16612)
-- Dependencies: 222
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public.questions (id, question, "categoryId", question_description) FROM stdin;
4	Вопрос 1	1	Ответ 1
5	Вопрос 2	1	Ответ 2
6	Вопрос 1	2	Ответ 1
\.


--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 203
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 205
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.images_id_seq', 5, true);


--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 207
-- Name: nsi_budget_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_budget_id_seq', 8, true);


--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 210
-- Name: nsi_colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_colors_id_seq', 10, true);


--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 211
-- Name: nsi_colors_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_colors_id_seq1', 15, true);


--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 226
-- Name: nsi_filter_budgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_filter_budgets_id_seq', 1, false);


--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 227
-- Name: nsi_filter_colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_filter_colors_id_seq', 1, false);


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 228
-- Name: nsi_filter_layouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_filter_layouts_id_seq', 1, false);


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 224
-- Name: nsi_filter_styles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_filter_styles_id_seq', 3, true);


--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 229
-- Name: nsi_filter_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_filter_types_id_seq', 1, false);


--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 230
-- Name: nsi_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_images_id_seq', 1, false);


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 231
-- Name: nsi_questions_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_questions_categories_id_seq', 1, false);


--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 214
-- Name: nsi_styles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_styles_id_seq', 10, true);


--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 215
-- Name: nsi_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.nsi_types_id_seq', 31, true);


--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 218
-- Name: portfolio_colors_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.portfolio_colors_list_id_seq', 4, true);


--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 219
-- Name: portfolio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.portfolio_id_seq', 10, true);


--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 221
-- Name: portfolio_images_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.portfolio_images_list_id_seq', 7, true);


--
-- TOC entry 3131 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public.questions_id_seq', 6, true);


--
-- TOC entry 2901 (class 2606 OID 16632)
-- Name: nsi_questions_categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_questions_categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 2903 (class 2606 OID 16634)
-- Name: nsi_images images_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_images
    ADD CONSTRAINT images_pk PRIMARY KEY (id);


--
-- TOC entry 2907 (class 2606 OID 16636)
-- Name: nsi_colors nsi_colors_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_colors
    ADD CONSTRAINT nsi_colors_pk PRIMARY KEY (id);


--
-- TOC entry 2905 (class 2606 OID 16638)
-- Name: nsi_filter_budgets nsi_filter_budget_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_budgets
    ADD CONSTRAINT nsi_filter_budget_pk PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 16640)
-- Name: nsi_filter_colors nsi_filter_colors_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_colors
    ADD CONSTRAINT nsi_filter_colors_pk PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 16642)
-- Name: nsi_filter_layouts nsi_filter_styles_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_layouts
    ADD CONSTRAINT nsi_filter_styles_pk PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 24689)
-- Name: nsi_filter_styles nsi_filter_styles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_styles
    ADD CONSTRAINT nsi_filter_styles_pkey PRIMARY KEY (id);


--
-- TOC entry 2913 (class 2606 OID 16644)
-- Name: nsi_filter_types nsi_filter_types_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.nsi_filter_types
    ADD CONSTRAINT nsi_filter_types_pk PRIMARY KEY (id);


--
-- TOC entry 2917 (class 2606 OID 16646)
-- Name: portfolio_colors_list portfolio_colors_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_colors_list
    ADD CONSTRAINT portfolio_colors_list_pk PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 16648)
-- Name: portfolio_images_list portfolio_images_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_images_list
    ADD CONSTRAINT portfolio_images_list_pk PRIMARY KEY (id);


--
-- TOC entry 2915 (class 2606 OID 16650)
-- Name: portfolio portfolio_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_pk PRIMARY KEY (id);


--
-- TOC entry 2921 (class 2606 OID 16652)
-- Name: questions questions_pk; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pk PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 16658)
-- Name: portfolio_colors_list FK_1d8b3530aeeac67ad13236d9299; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_colors_list
    ADD CONSTRAINT "FK_1d8b3530aeeac67ad13236d9299" FOREIGN KEY (work) REFERENCES public.portfolio(id);


--
-- TOC entry 2931 (class 2606 OID 16673)
-- Name: portfolio_images_list FK_24e0e277406a571261c8724940c; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_images_list
    ADD CONSTRAINT "FK_24e0e277406a571261c8724940c" FOREIGN KEY (work) REFERENCES public.portfolio(id);


--
-- TOC entry 2930 (class 2606 OID 24815)
-- Name: portfolio_colors_list FK_6fc575572cbb92b9567cc07bf41; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_colors_list
    ADD CONSTRAINT "FK_6fc575572cbb92b9567cc07bf41" FOREIGN KEY (color) REFERENCES public.nsi_colors(id);


--
-- TOC entry 2924 (class 2606 OID 24835)
-- Name: portfolio FK_7c0b2cf87b30c2c8409fe8606c4; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_7c0b2cf87b30c2c8409fe8606c4" FOREIGN KEY (body_color) REFERENCES public.nsi_colors(id);


--
-- TOC entry 2925 (class 2606 OID 24840)
-- Name: portfolio FK_80ffe87a234feced1adbf08d10f; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_80ffe87a234feced1adbf08d10f" FOREIGN KEY (table_top_color) REFERENCES public.nsi_colors(id);


--
-- TOC entry 2926 (class 2606 OID 24825)
-- Name: portfolio FK_9f6d501566176ab802d25958643; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_9f6d501566176ab802d25958643" FOREIGN KEY (type) REFERENCES public.nsi_filter_types(id);


--
-- TOC entry 2927 (class 2606 OID 24690)
-- Name: portfolio FK_f1b248d1c9f62f6404a2233ec9f; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_f1b248d1c9f62f6404a2233ec9f" FOREIGN KEY (style) REFERENCES public.nsi_filter_styles(id);


--
-- TOC entry 2932 (class 2606 OID 24820)
-- Name: portfolio_images_list FK_f729ba5dfd107ac9a2d93667658; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio_images_list
    ADD CONSTRAINT "FK_f729ba5dfd107ac9a2d93667658" FOREIGN KEY (image) REFERENCES public.nsi_images(id);


--
-- TOC entry 2928 (class 2606 OID 24830)
-- Name: portfolio FK_f7eafafe60d6618cf1deb6f5891; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_f7eafafe60d6618cf1deb6f5891" FOREIGN KEY (layout) REFERENCES public.nsi_filter_layouts(id);


--
-- TOC entry 2933 (class 2606 OID 24845)
-- Name: questions FK_f7f9c25bf2bac126d941673a7dc; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_f7f9c25bf2bac126d941673a7dc" FOREIGN KEY ("categoryId") REFERENCES public.nsi_questions_categories(id);


--
-- TOC entry 3095 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2025-12-27 19:10:08 MSK

--
-- PostgreSQL database dump complete
--
