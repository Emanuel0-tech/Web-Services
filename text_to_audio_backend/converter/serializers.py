from rest_framework import serializers

class TextToAudioSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=500)
    language = serializers.ChoiceField(choices=[ ('en', 'English'),
        ('pt', 'Portuguese'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('de', 'German'),
        ('it', 'Italian'),
        ('nl', 'Dutch'),
        ('ru', 'Russian'),
        ('ar', 'Arabic'),
        ('hi', 'Hindi'),
        ('ja', 'Japanese'),
        ('ko', 'Korean'),
        ('zh', 'Chinese'),], default='pt')
    