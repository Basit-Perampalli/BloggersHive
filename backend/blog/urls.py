
from django.urls import path
from .views import createBlog,getAllBlogs,getUserBlogs,updateBlog,deleteBlog

urlpatterns = [
    path("create/", createBlog, name="createBlog"),
    path('getblogs/',getAllBlogs,name='getAllBlogs'),
    path('getuserblogs/',getUserBlogs,name='getUserBlogs'),
    path('<int:blog_id>/update/', updateBlog, name='updateBlog'),
    path('<int:blog_id>/delete/', deleteBlog, name='deleteBlog'),
]