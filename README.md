Project is built using NodeJS and MongoDb.
It is build upon following requirements:

Make a service which creates different posts. only required technology is express.js you can choose everything else.
post consists of an image (jpg, png, jpeg types only), title, description and tags. tags are case insensitive and we need to have a tag counter. so for example we should be able to see how many posts are there with specific tags.
post requirements:
all fields are required except tags. 
the title should be unique, min length 3 max 20
description min length 10 max 3000

features:
fetch posts. // order create date desc
fetch specific post by title
search posts by title (case insensitive search), tags, user and in between specific dates (not all fields are required but we should be able to filter with all of them if user provides)
create post
update post
delete post by ids

few considerations:
when we are creating a post we should have a jwt token in header. from jwt token we should read user's username
when deleting or updating posts we should check if it's a valid user to delete or update a post
when fetching the post we should also get the username who created a post and create date.


ENDPOINTS:
(GET) http://{domain}/posts/get/:title	
(GET) http://{domain}/posts/get
(GET) http://{domain}/posts/search/searchKey
(GET) http://{domain}/posts/by-tag/haha,bojour (multiple tags can be specified using comma)
(POST) http://{domain}/posts/create
(PATCH) http://{domain}/posts/update/:postId
(DELETE) http://{domain}/posts/delete/:postId

Authorization request header should be specified on each request. Currently existing functionality just mocks this behaviour. 
In request just specify "Authorization" as key and whatever the value will be specified that will be treated as a username which will be applied to a post.

Note that search functionality uses MongoDB indexing, so please on your MongoDB instance do not forget to run following command.

db.posts.createIndex( { "$**": "text" }, { "default_language": "english", "caseLevel": false } ).
