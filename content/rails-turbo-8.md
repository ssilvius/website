---
id: Yq0kRH
title: "Migrating from Turbo 7 to Turbo 8 in Ruby on Rails"
slug: nextjs-mdx-app-routes
featured: false
date: 2024-01-18T11:27:18
coverImage: ''
tags:
  - rails
  - stimulusjs
author:
  name: Sean Silvius
  picture: /images/profile.jpg
excerpt: "Turbo, a key component of the Hotwire framework, has been a game-changer in the world of Ruby on Rails development. It provides a seamless way to build fast, modern, and responsive web applications without the need for a separate frontend framework. Recently, the Turbo team has released version 8, bringing a host of new features and improvements."
---

If you're currently using Turbo 7 in your Rails application, you may be wondering how to migrate to the latest version. In this article, we'll guide you through the process of migrating from Turbo 7 to Turbo 8, exploring the key changes and the steps you need to take to ensure a smooth transition.

## Understanding the Differences Between Turbo 7 and Turbo 8

Before we dive into the migration process, let's briefly discuss the main differences between Turbo 7 and Turbo 8:

1. **Improved Performance**: Turbo 8 introduces several performance optimizations, including faster page loads, reduced network requests, and better support for parallel requests.
2. **Enhanced Navigation**: Turbo 8 offers improved navigation behavior, with better support for history management, URL updating, and navigation events.
3. **Simplified Configuration**: Turbo 8 has a more streamlined configuration process, with fewer options and a more intuitive setup.
4. **Compatibility with Stimulus**: Turbo 8 has been designed to work seamlessly with Stimulus, the complementary JavaScript framework for Rails.
5. **Deprecation of Turbolinks**: Turbolinks, the predecessor to Turbo, have been officially deprecated in Turbo 8. This means you'll need to migrate your existing Turbolinks-based functionality to Turbo.

## Preparing for the Migration

Before you begin the migration process, make sure you have the following:

1. **Up-to-date Rails and Turbo versions**: Ensure that your Rails application is using the latest stable version and that you've installed the latest version of Turbo (version 8.0.0 or higher).
2. **Thorough understanding of Turbo 8**: Review the [Turbo documentation](https://turbo.hotwired.dev/handbook/introduction) to familiarize yourself with the new features and changes introduced in Turbo 8.
3. **Backup your application**: As with any major update, it's crucial to have a backup of your application's codebase and database before proceeding with the migration.

## Migrating from Turbo 7 to Turbo 8

Now, let's go through the step-by-step process of migrating your Rails application from Turbo 7 to Turbo 8:

1. **Update Turbo in your application**:
   - In your `package.json` file, update the `@hotwired/turbo` dependency to the latest version (8.0.0 or higher).
   - Run `yarn install` (or `npm install`) to update the dependency.

2. **Replace Turbolinks with Turbo**:
   - In your `application.js` file, replace `import "turbolinks"` with `import "@hotwired/turbo-rails"`.
   - Remove any references to `Turbolinks` in your application, such as `data-turbolinks-track` attributes.

3. **Migrate your Turbolinks-based functionality to Turbo**:
   - Review the [Turbo documentation](https://turbo.hotwired.dev/handbook/introduction) to understand the new Turbo concepts, such as Frames, Visits, and Streams.
   - Update your existing functionality to use the appropriate Turbo features. For example, replace `data-remote="true"` with `data-turbo-frame="..."` or `data-turbo-stream="..."`.

   Here's an example of how to migrate a basic CRUD operation from Turbo 7 to Turbo 8:

   ```html
   <!-- Turbo 7 -->
   <%= link_to 'Create Post', new_post_path, remote: true %>

   <!-- Turbo 8 -->
   <%= link_to 'Create Post', new_post_path, data: { turbo_frame: "new_post" } %>

   <div id="new_post">
     <%= render 'form', post: @post %>
   </div>
   ```

   ```html
   <!-- Turbo 7 -->
   <%= form_with(model: @post, remote: true) do |form| %>
     <!-- form fields -->
     <%= form.submit %>
   <% end %>

   <!-- Turbo 8 -->
   <%= form_with(model: @post, data: { turbo_frame: "_top" }) do |form| %>
     <!-- form fields -->
     <%= form.submit %>
   <% end %>
   ```

4. **Remove Turbo Frames and Rely on Model Changes**:
   One of the key changes in Turbo 8 is the deprecation of Turbo Frames. Instead of using Frames to manage partial updates, you can now rely on the changes to your models to broadcast updates to the UI.

   Here's an example of how to update a post and broadcast the changes:

   ```ruby
   # app/controllers/posts_controller.rb
   def update
     @post = Post.find(params[:id])
     if @post.update(post_params)
       # Broadcast the updated post
       ActionCable.server.broadcast("posts_channel", { post: @post })
       redirect_to @post
     else
       render :edit
     end
   end

   private

   def post_params
     params.require(:post).permit(:title, :content)
   end
   ```

   ```html
   <!-- app/views/posts/show.html.erb -->
   <div id="post-<%= @post.id %>">
     <h1><%= @post.title %></h1>
     <p><%= @post.content %></p>
   </div>

   <%= turbo_stream_from "posts_channel" %>
   <%= turbo_stream_from "post-#{@post.id}" %>

   <%= turbo_stream_tag "post-#{@post.id}", action: :update do %>
     <%= render partial: "post", locals: { post: @post } %>
   <% end %>
   ```

   In this example, when the `update` action is successful, we broadcast the updated post to the `posts_channel` and the `post-#{@post.id}` channel. The client-side code listens for these broadcasts and updates the post content without a full page refresh.

5. **Update your view templates**:
   - In your layout file (e.g., `application.html.erb`), replace `<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>` with `<%= javascript_importmap_tags %>`.
   - If you were using the `turbo-rails` gem, remove it from your `Gemfile` and update your application to use the new JavaScript-based Turbo implementation.

6. **Optimize your application for Turbo 8**:
   - Review the [Turbo 8 release notes](https://github.com/hotwired/turbo/releases/tag/v8.0.0) and implement any necessary changes to take advantage of the new features and improvements.
   - Ensure that your application's navigation, form submissions, and other interactions are optimized for Turbo 8's enhanced behavior.

7. **Update your tests**:
   - Review your existing tests and update them to account for the changes in Turbo 8 behavior.
   - Ensure that your application's functionality continues to work as expected after the migration.

8. **Deploy the migration**:
   - Once you've completed the migration process and verified that your application is working as expected, deploy the changes to your production environment.

Remember, the migration process may vary depending on the complexity of your existing Turbolinks-based implementation and the specific features and functionality you're using in your Rails application. It's important to thoroughly test your application during and after the migration to ensure a smooth transition.

## Conclusion

Migrating from Turbo 7 to Turbo 8 in your Ruby on Rails application can be a straightforward process, but it requires careful planning and execution. By understanding the key differences between the two versions and following the steps outlined in this article, you can successfully migrate your application to Turbo 8 and take advantage of the new features and performance improvements.

Remember, the Turbo team is committed to providing a seamless experience for developers, and they've made the migration process as smooth as possible. If you encounter any issues or have questions during the migration, be sure to refer to the Turbo documentation or reach out to the community for support.