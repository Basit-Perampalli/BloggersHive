from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializer import BlogSerializer

@api_view(['GET'])
def getRandomBlogs(request):
    blogs = Blog.objects.order_by('?')[:10]  # Retrieve 10 random blogs
    serializer = BlogSerializer(blogs, many=True)
    try:
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response("0 Blogs", status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlog(request):
    data = request.data
    serializer = BlogSerializer(data=data)
    
    if serializer.is_valid():
        # Set the author to the current user
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    if blog.author != request.user:
        return Response({'error': 'You do not have permission to edit this blog'}, status=status.HTTP_403_FORBIDDEN)

    serializer = BlogSerializer(blog, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    if blog.author != request.user:
        return Response({'error': 'You do not have permission to delete this blog'}, status=status.HTTP_403_FORBIDDEN)

    blog.delete()
    return Response({'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
