import Icon from '@components/Icon'
import NavBar from '@components/NavBar'
import NoneComment from '@components/NoneComment'
import Sticky from '@components/Sticky'
import {
  deleteCollection,
  deleteCommentLiking,
  deleteFollow,
  deleteLiking,
  getArticleInfo,
  getCommentList,
  getMoreComment,
  setComment,
  setInfo,
  updateCollection,
  updateCommentLiking,
  updateFollow,
  updateLiking,
} from '@store/actions'
import { Popup } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import throttle from 'lodash/fp/throttle'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CommentFooter from './components/CommentFooter'
import CommentInput from './components/CommentInput'
import CommentItem from './components/CommentItem'
import Reply from './components/Reply'
import Share from './components/Share'
import styles from './index.module.scss'

const useScroll = (
  handleScroll = () => {},
  {
    container,
    placeholder,
    isFinished = () => false,
    offset = 300,
    stop = false,
  }
) => {
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const onScroll = useMemo(
    () =>
      throttle(200, async () => {
        if (finished) return

        const { bottom: scrollBottom } = container.getBoundingClientRect()
        const { bottom: placehoderBottom } = placeholder.getBoundingClientRect()
        if (placehoderBottom - scrollBottom <= offset) {
          setLoading(true)
          await handleScroll()
          setLoading(false)
          setFinished(isFinished())
        }
      }),
    [handleScroll, placeholder, container, offset, finished, isFinished]
  )

  useEffect(() => {
    if (!container || !placeholder) return
    if (stop) return

    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [container, placeholder, onScroll, stop])

  return { loading, finished }
}

const Article = () => {
  const dispatch = useDispatch()
  const {
    isLoading: isArticleLoading,
    info: articleDetail,
    comment: articleComment,
    isCommentLoading,
  } = useSelector((state) => state.article)
  const [commentOpen, setCommentOpen] = useState({
    visible: false,
    id: 0,
  })
  const [replyOpen, setReplyOpen] = useState({
    visible: false,
    data: {},
  })
  const [shareOpen, setShareOpen] = useState(false)
  const [showNavAuthor, setShowNavAuthor] = useState(false)
  // const [finished, setFinished] = useState(false)
  const authorRef = useRef()
  const wrapperRef = useRef()
  const commentRef = useRef()

  // list ??????
  const listRootRef = useRef()
  const listPlaceholderRef = useRef()

  const { id } = useParams()
  const history = useHistory()

  // https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
  const { finished /* loading */ } = useScroll(
    useCallback(() => {
      dispatch(
        getMoreComment({
          type: 'a',
          source: id,
          offset: articleComment.last_id,
        })
      )
    }, [articleComment.last_id, dispatch, id]),
    {
      container: wrapperRef.current,
      placeholder: listPlaceholderRef.current,
      stop:
        isArticleLoading ||
        articleComment.results.length === 0 ||
        isCommentLoading,
      isFinished: () => articleComment.end_id === articleComment.last_id,
    }
  )

  // console.log('finished', finished, 'loading', loading)

  // ??????????????????
  useEffect(() => {
    dispatch(getArticleInfo(id))
  }, [dispatch, id])

  // ??????????????????
  useEffect(() => {
    dispatch(getCommentList({ type: 'a', source: id }))
  }, [dispatch, id])

  // ???????????? ???????????? ??????
  useEffect(() => {
    if (isArticleLoading) return

    const dgHtml = document.querySelector('.dg-html')
    const codes = dgHtml.querySelectorAll('pre code')

    hljs.configure({
      // ????????????
      ignoreUnescapedHTML: true,
    })

    if (codes.length > 0) {
      codes.forEach((block) => {
        hljs.highlightElement(block)
      })
      return
    }

    const pre = dgHtml.querySelectorAll('pre')
    if (pre.length > 0) {
      pre.forEach((block) => {
        hljs.highlightElement(block)
      })
    }
  }, [isArticleLoading])

  // ???????????? - ??? NavBar ?????????????????????
  useEffect(() => {
    if (isArticleLoading) return

    const wrapperDOM = wrapperRef.current

    const onScroll = throttle(200, () => {
      const { top } = authorRef.current.getBoundingClientRect()
      if (top <= 0) {
        setShowNavAuthor(true)
      } else {
        showNavAuthor && setShowNavAuthor(false)
      }
    })

    wrapperDOM.addEventListener('scroll', onScroll)
    return () => wrapperDOM.removeEventListener('scroll', onScroll)
  }, [showNavAuthor, isArticleLoading])

  // ????????????????????????
  // useEffect(() => {
  //   if (isArticleLoading) return
  //   if (articleComment.results.length === 0) return
  //   if (isCommentLoading || finished) return

  //   // const listRootDOM = listRootRef.current
  //   const listPlacehoderDOM = listPlaceholderRef.current
  //   // ???????????????
  //   const wrapperDOM = wrapperRef.current

  //   const onScroll = throttle(200, async () => {
  //     const { bottom: scrollBottom } = wrapperDOM.getBoundingClientRect()
  //     const { bottom: placehoderBottom } =
  //       listPlacehoderDOM.getBoundingClientRect()

  //     if (placehoderBottom - scrollBottom <= 300) {
  //       // ??????
  //       if (articleComment.end_id === articleComment.last_id) {
  //         // ????????????
  //         setFinished(true)
  //       } else {
  //         // ?????????????????????
  //         dispatch(
  //           getMoreComment({
  //             type: 'a',
  //             source: id,
  //             offset: articleComment.last_id
  //           })
  //         )
  //       }
  //     }
  //   })

  //   wrapperDOM.addEventListener('scroll', onScroll)
  //   return () => wrapperDOM.removeEventListener('scroll', onScroll)
  // }, [
  //   dispatch,
  //   isArticleLoading,
  //   isCommentLoading,
  //   finished,
  //   id,
  //   articleComment.end_id,
  //   articleComment.last_id,
  //   articleComment.results.length
  // ])

  // ????????????????????????
  const onOpenReply = (data) => {
    setReplyOpen({
      visible: true,
      data,
    })
  }

  // ????????????????????????
  const onCloseReply = () => {
    setReplyOpen({
      visible: false,
      data: {},
    })
  }

  // ??????????????????
  const onComment = () => {
    setCommentOpen({
      visible: true,
      id: art_id,
    })
  }

  // ??????????????????
  const onCloseComment = () => {
    setCommentOpen({
      visible: false,
      id: 0,
    })
  }

  // ????????????????????????????????????
  const onInsertComment = (comment) => {
    dispatch(
      setComment({
        results: [comment, ...articleComment.results],
      })
    )

    dispatch(
      setInfo({
        comm_count: articleDetail.comm_count + 1,
      })
    )
  }

  // ????????????
  const onLike = async () => {
    if (attitude === 1) {
      // ????????????
      dispatch(deleteLiking(art_id))
      return
    }

    // ??????
    dispatch(updateLiking(art_id))
  }

  // ??????
  const onCollected = async () => {
    if (is_collected) {
      // ????????????
      dispatch(deleteCollection(art_id))
      return
    }

    // ??????
    dispatch(updateCollection(art_id))
  }

  // ??????
  const onFollow = async () => {
    if (is_followed) {
      // ????????????
      dispatch(deleteFollow(aut_id))
      return
    }

    // ??????
    dispatch(updateFollow(aut_id))
  }

  // ????????????
  const onThumbsUp = async (com_id, is_liking) => {
    if (is_liking) {
      // ??????????????????
      dispatch(deleteCommentLiking(com_id))
      return
    }

    // ????????????
    dispatch(updateCommentLiking(com_id))
  }

  // ??????????????????
  const onShowComment = () => {
    wrapperRef.current.scrollTop = commentRef.current.offsetTop - 46
  }

  // ??????
  const {
    art_id,
    attitude,
    aut_id,
    aut_name,
    aut_photo,
    comm_count,
    content,
    is_collected,
    is_followed,
    like_count,
    pubdate,
    read_count,
    title,
  } = articleDetail

  // ????????????
  const { results } = articleComment

  const date = dayjs(pubdate).format('YYYY-MM-DD')

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onLeftClick={() => history.go(-1)}
          rightContent={
            <span onClick={() => setShareOpen(true)}>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {showNavAuthor && (
            <div className="nav-author">
              <img src={aut_photo} alt="" />
              <span className="name">{aut_name}</span>
              <span
                onClick={onFollow}
                className={classNames('follow', is_followed ? 'followed' : '')}
              >
                {is_followed ? '?????????' : '??????'}
              </span>
            </div>
          )}
        </NavBar>
        {isArticleLoading ? (
          <ContentLoader
            speed={2}
            width={375}
            height={230}
            viewBox="0 0 375 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* https://skeletonreact.com/ */}
            <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
            <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
            <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
            <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
            <circle cx="33" cy="69" r="17" />
            <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
            <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
            <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
            <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
            <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
            <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
          </ContentLoader>
        ) : (
          <>
            <div className="wrapper" ref={wrapperRef}>
              <div className="article-wrapper">
                <div className="header">
                  <h1 className="title">{title}</h1>

                  <div className="info">
                    <span>{date}</span>
                    <span>{read_count} ??????</span>
                    <span>{comm_count} ??????</span>
                  </div>

                  <div className="author" ref={authorRef}>
                    <img src={aut_photo} alt="" />
                    <span className="name">{aut_name}</span>
                    <span
                      onClick={onFollow}
                      className={classNames(
                        'follow',
                        is_followed ? 'followed' : ''
                      )}
                    >
                      {is_followed ? '?????????' : '??????'}
                    </span>
                  </div>
                </div>

                <div className="content">
                  <div
                    className="content-html dg-html"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content || ''),
                    }}
                  />
                  <div className="date">?????????????????????{date}</div>
                </div>
              </div>

              <div className="comment" ref={commentRef}>
                <Sticky root={wrapperRef.current} height={51} offset={46}>
                  <div className="comment-header">
                    <span>???????????????{comm_count}???</span>
                    <span>{like_count} ??????</span>
                  </div>
                </Sticky>
                {comm_count === 0 ? (
                  <NoneComment />
                ) : (
                  <div className="comment-list" ref={listRootRef}>
                    {results?.map((item) => {
                      const { com_id, is_liking } = item
                      return (
                        <CommentItem
                          key={com_id}
                          {...item}
                          onOpenReply={() => onOpenReply(item)}
                          onThumbsUp={() => onThumbsUp(com_id, is_liking)}
                        />
                      )
                    })}

                    {isCommentLoading && (
                      <div className="list-loading">?????????...</div>
                    )}
                    {finished && <div className="no-more">???????????????</div>}
                    <div className="placeholder" ref={listPlaceholderRef}></div>
                  </div>
                )}
              </div>
            </div>
            <CommentFooter
              comm_count={comm_count}
              placeholder={comm_count === 0 ? '?????????' : '?????????'}
              onComment={onComment}
              attitude={attitude}
              onLike={onLike}
              is_collected={is_collected}
              onCollected={onCollected}
              onShare={() => setShareOpen(true)}
              onShowComment={onShowComment}
            />
          </>
        )}
      </div>

      {/* ?????? */}
      <Popup
        className="drawer"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {commentOpen.visible && (
              <CommentInput
                id={commentOpen.id}
                onClose={onCloseComment}
                onComment={onInsertComment}
              />
            )}
          </div>
        }
        open={commentOpen.visible}
        onOpenChange={onCloseComment}
      >
        {''}
      </Popup>

      {/* ?????? */}
      <Popup
        className="drawer-right"
        position="right"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {replyOpen.visible && (
              <Reply
                data={replyOpen.data}
                art_id={art_id}
                onClose={onCloseReply}
              />
            )}
          </div>
        }
        open={replyOpen.visible}
        onOpenChange={onCloseReply}
      >
        {''}
      </Popup>

      {/* ?????? */}
      <Popup
        className="drawer-share"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={<Share onClose={() => setShareOpen(false)} />}
        open={shareOpen}
        onOpenChange={() => setShareOpen(false)}
      >
        {''}
      </Popup>
    </div>
  )
}

export default Article

/*
// comment item
<div className="comment-item">
  <div className="avatar">
    <img
      src="http://toutiao.itheima.net/images/user_head.jpg"
      alt=""
    />
  </div>
  <div className="comment-info">
    <div className="comment-info-header">
      <span className="name">Wen Yahui</span>
      <span className="thumbs-up">
        1090
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#iconbtn_like2"></use>
        </svg>
      </span>
    </div>
    <div className="comment-content">
      ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    </div>
    <div className="comment-footer">
      <span className="replay" onClick={() => setOpen1(true)}>
        2??????
        <span className="icon"> &gt;</span>
      </span>
      <span className="comment-time">2?????????</span>
      <svg className="icon close" aria-hidden="true">
        <use xlinkHref="#iconbtn_essay_close"></use>
      </svg>
    </div>
  </div>
</div>
*/

/*
  // footer
  <div className="footer">
    <div className="input-btn" onClick={() => setOpen(true)}>
      <Icon type="iconbianji" />
      <span>?????????</span>
    </div>
    <div className="action-item">
      <Icon type="iconbtn_comment" />
      <p>??????</p>
      {comm_count && <span className="bage">{comm_count}</span>}
    </div>
    <div className="action-item">
      <Icon type={is_followed ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
      <p>??????</p>
    </div>
    <div className="action-item">
      <Icon
        type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
      />
      <p>??????</p>
    </div>
    <div className="action-item">
      <Icon type="iconbtn_share" />
      <p>??????</p>
    </div>
  </div>
*/
