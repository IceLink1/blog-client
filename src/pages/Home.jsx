import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/slices/posts'
import { fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts ,tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Комментарии и Тэги"  />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}  className='HomePage'>
      <Grid item className='HomeCommentsMobile'>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Ползовотель один',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'А каторый час?',
              },
              {
                user: {
                  fullName: 'Ползовотель один',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Привет всем!',
              },
            ]}
            isLoading={false}
          />
        </Grid>
        <Grid item className='HomePosts'>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
            <Post key={index} isLoading={true}></Post>
          ) : (
            <Post
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl? `https://cloud-storage-server-r2ju.onrender.com${obj.imageUrl}`:''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />)
          )}
        </Grid>
        <Grid item className='HomeComments'>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'User one',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'User two',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
