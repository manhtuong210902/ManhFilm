import { Col, Container, Row } from 'react-bootstrap';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import Button from '../Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { AuthContext } from '~/context/AuthProvider';
import moment from 'moment/moment';
import ToastCustom from '../Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Comment({ movie_id }) {
    const [text, setText] = useState('');
    const { user } = useContext(AuthContext);
    const inputRef = useRef();
    const [comments, setComments] = useState([]);
    const [showNotLogin, setShowNotLogin] = useState(false);

    useEffect(() => {
        const getComments = async () => {
            const q = await query(collection(db, 'comments'), where('movie_id', '==', movie_id));
            const querySnapshot = await getDocs(q);

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            return data;
        };

        getComments().then((data) => {
            setComments(data);
        });
    }, [movie_id]);

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!user) {
            setShowNotLogin(true);
            return;
        }

        if (text) {
            try {
                const date = new Date();
                const dateText = moment(date).format('MMMM Do,YYYY');
                const newComment = {
                    text: text,
                    author: user.displayName,
                    time: dateText,
                    avatar: user.photoURL,
                    movie_id: movie_id,
                };
                await addDoc(collection(db, 'comments'), newComment);
                setComments((prevComment) => [...prevComment, newComment]);
            } catch (error) {
                console.log(error);
            }
        }
        setText('');
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('custom-container')}>
                <div className={cx('section-title')}>
                    <span className={cx('sub-title')}>VIEWER FEEDBACK</span>
                    <h1 className={cx('title')}>{comments.length} Comments</h1>
                </div>

                <Row className="border-bottom">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => {
                            return (
                                <Col xs={12} className={cx('item')} key={index}>
                                    <div className={cx('item-wrapper')}>
                                        <Image src={comment.avatar} className={cx('avatar')} />
                                        <div className={cx('detail')}>
                                            <h3 className={cx('name')}>{comment.author}</h3>
                                            <span>{comment.time}</span>
                                            <p>{comment.text}</p>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })
                    ) : (
                        <div className={cx('no-comment')}>
                            <p>There are no reviews for this movie yet</p>
                            <p
                                className={cx('start')}
                                onClick={() => {
                                    inputRef.current.focus();
                                }}
                            >
                                Go to comment
                            </p>
                        </div>
                    )}
                </Row>

                <div className={cx('your-comment')}>
                    <h1 className={cx('title')}>Leave a Comment</h1>
                    <p className={cx('heading')}>Your comment</p>
                    <form onSubmit={handleAddComment}>
                        <textarea
                            placeholder="Enter your comment ..."
                            value={text}
                            rows={3}
                            onChange={(e) => setText(e.target.value)}
                            ref={inputRef}
                        />
                        <Button secondary className={cx('btn-submit')}>
                            SUBMIT
                        </Button>
                    </form>
                </div>
            </Container>
            <>
                <ToastCustom
                    show={showNotLogin}
                    setShow={setShowNotLogin}
                    text={'Please login to use this feature'}
                    icon={<FontAwesomeIcon icon={faXmarkCircle} />}
                    color={'#f85d5d'}
                />
            </>
        </div>
    );
}

export default Comment;
