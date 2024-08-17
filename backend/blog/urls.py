
from django.urls import path
from .views import createBlog,updateBlog,deleteBlog,getAllBlogs,getUserBlogs

urlpatterns = [
    path("create/", createBlog, name="createBlog"),
    path('getuserblogs/',getUserBlogs,name='getUserBlogs'),
    path('getblogs/',getAllBlogs,name='getAllBlogs'),
    path('<int:blog_id>/update/', updateBlog, name='updateBlog'),
    path('<int:blog_id>/delete/', deleteBlog, name='deleteBlog'),
]