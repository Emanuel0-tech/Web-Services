from django.urls import path
from .views import TextToAudioView

urlpatterns = [
    path('text-to-audio/', TextToAudioView.as_view()),
]