﻿using System;
using System.ComponentModel.DataAnnotations;

namespace TrainingDotNetCoreMvc.Models
{
    public class MovieModel
    {

        public int id { get; set; }
        public string title { get; set; }
        public string coverImg { get; set; }
        public DateTime? releaseDate { get; set; }
        public string genre { get; set; }
        public int duration { get; set; }
        public DateTime? createDate { get; set; }
        public DateTime? modifyDate { get; set; }

        public MovieModel()
        {
        }
    }
}
