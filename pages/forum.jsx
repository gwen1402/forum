import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content })
    });
    setAuthor("");
    setContent("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <motion.h1 className="text-3xl font-bold text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        📊 Diễn Đàn Kế Toán
      </motion.h1>

      <Card className="mb-6 shadow-lg">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Tên của bạn"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <Textarea
              placeholder="Câu hỏi hoặc chia sẻ kế toán..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
            />
            <Button type="submit" className="w-full">
              Đăng Bài
            </Button>
          </form>
        </CardContent>
      </Card>

      <ScrollArea className="h-[500px] rounded-md border p-2">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="shadow-md">
              <CardContent className="p-4">
                <p className="font-semibold text-blue-600">{post.author}</p>
                <p className="mt-2 text-gray-800 whitespace-pre-wrap">{post.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ForumPage;
