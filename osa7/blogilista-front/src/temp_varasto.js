creator={Store.getState().blogs.find(b => b.id === match.params.id).user.username === user.username}

<Notification notification={Store.getState().notification} />

{Store.getState().blogs.sort(byLikes).map(blog =>
                <Blog
                key={blog.id}
                blog={blog}
                like={likeBlog}
                remove={removeBlog}
                user={user}
                creator={blog.user.username === user.username}
                />
              )}

              
              