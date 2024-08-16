
from django.urls import path
from .views import createBlog,updateBlog,deleteBlog,getRandomBlogs

urlpatterns = [
    path("create/", createBlog, name="createBlog"),
    path('getblogs/',getRandomBlogs,name='getRandomBlogs'),
    path('<int:blog_id>/update/', updateBlog, name='updateBlog'),
    path('<int:blog_id>/delete/', deleteBlog, name='deleteBlog'),
]