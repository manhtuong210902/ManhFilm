import Slider from 'react-slick';
import MovieItem from '../MovieItem';

function MovieSlider({ movies, className }) {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <></>,
        prevArrow: <></>,
        customPaging: (i) => <div className={'dot-custom'}></div>,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className={className}>
            {movies &&
                movies.map((movie, index) => {
                    return <MovieItem key={index} data={movie} />;
                })}
        </Slider>
    );
}

export default MovieSlider;
