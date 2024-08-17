
from django.urls import path
from .views import createBlog,getAllBlogs,getUserBlogs,updateBlog,deleteBlog

urlpatterns = [
    path("create/", createBlog, name="createBlog"),
    path('getblogs/',getAllBlogs,name='getAllBlogs'),
    path('getuserblogs/',getUserBlogs,name='getUserBlogs'),
    path('update/<int:blog_id>/', updateBlog, name='updateBlog'),
    path('delete/<int:blog_id>/', deleteBlog, name='deleteBlog'),
]