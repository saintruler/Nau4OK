from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from Nau4OK.settings import AUTH_USER_MODEL


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)

    is_author = models.BooleanField(
        _('author status'),
        default=0,
        help_text=_('Designates that this user can post new articles.'),
    )

    def __str__(self):
        return self.username


class Article(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=350)
    text = models.TextField()
    image = models.ImageField(upload_to='article_images/')
    rating = models.IntegerField(default=0)
    n_comments = models.IntegerField(default=0)
    published_date = models.DateTimeField(auto_now_add=timezone.now)

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_comments')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_comments')
    published_date = models.DateTimeField(auto_now_add=timezone.now)
    text = models.TextField()

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.text[:20]
