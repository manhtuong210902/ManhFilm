import { Row } from 'react-bootstrap';
import MovieItem from '../MovieItem';

function MovieSlider({ movies, className }) {
    return (
        <Row className={className}>
            {movies &&
                movies.map((movie, index) => {
                    return <MovieItem key={index} data={movie} />;
                })}
        </Row>
    );
}

export default MovieSlider;
