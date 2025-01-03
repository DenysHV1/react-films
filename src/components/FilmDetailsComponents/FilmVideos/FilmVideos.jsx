import s from "./FilmVideos.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//redux
import {
  filmIsLoadingSelector,
  filmVideosSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";
import { filmVideosThunk } from "../../../redux/filmDetails/filmDetailsThunks";

//icons
import { RiMovieFill } from "react-icons/ri";
import Loader from "../../Loader/Loader";
import { addVideo } from "../../../redux/User/userReducer";
import iziToast from "izitoast";
import { selectSessionIdAuth } from "../../../redux/auth/authSelectors";

const FilmGallery = ({ filmID }) => {
  //item buttons and navigate
  const [itemsBtn, setItemBTN] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(1);

  //redux
  const dispatch = useDispatch();
  const videos = useSelector(filmVideosSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const sessionId = useSelector(selectSessionIdAuth);

  useEffect(() => {
    dispatch(filmVideosThunk(filmID));
  }, [dispatch, filmID]);

  useEffect(() => {
    if (videos.length > 0) {
      const arr = Array.from({ length: videos.length }, (_, i) => i + 1);
      setItemBTN(arr);
    }
  }, [videos]);

  return (
    <>
      {videos?.length > 0 && (
        <section className={s.trailers_section}>
          <h1 className={s.title}>Playlist</h1>
          <ul className={s.trailerBtn_list}>
            {itemsBtn.map((item) => (
              <li className={s.trailer_item} key={`${item}btn`}>
                <button
                  type="button"
                  className={s.trailer_btn}
                  onClick={() => setCurrentTrailer(item)}
                >
                  <RiMovieFill className={s.btn_svg} /> <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
          {isLoading && <Loader />}
          <ul>
            {videos.map(
              ({ id, key, name }, idx) =>
                key &&
                currentTrailer === idx + 1 && (
                  <li key={id} className={s.videoContainer}>
                    <iframe
                      className={s.iframeVideo}
                      src={`https://www.youtube.com/embed/${key}`}
                      title={name || "alternative name"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                    {sessionId && (
                      <button
                        onClick={() => {
                          iziToast.success({
                            title: "Success!",
                            message: `The movie "${name}" has been successfully added to your list.`,
                            position: "topRight",
                            timeout: 3000,
                            transitionIn: "fadeIn",
                            transitionOut: "fadeOut",
                            color: "#03a703",
                          });
                          return dispatch(
                            addVideo({ id, key: key, name: name })
                          );
                        }}
                        className={s.addVideo}
                      >
                        Add Video
                      </button>
                    )}
                  </li>
                )
            )}
          </ul>
        </section>
      )}
    </>
  );
};

export default FilmGallery;
