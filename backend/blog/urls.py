
from django.urls import path
from ...server.blog.views import createBlog,updateBlog,deleteBlog,getRandomBlogs,getUserBlogs

urlpatterns = [
    path("create/", createBlog, name="createBlog"),
    path('getblogs/',getRandomBlogs,name='getRandomBlogs'),
    path('getuserblogs/',getUserBlogs,name='getUserBlogs'),
    path('<int:blog_id>/update/', updateBlog, name='updateBlog'),
    path('<int:blog_id>/delete/', deleteBlog, name='deleteBlog'),
]