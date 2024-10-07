document.addEventListener( 'DOMContentLoaded', ( ) => {
  var blog = document.getElementById( 'blog' );

  if ( blog === null ) return;

  fetch( 'data/blog.json' ).then( ( res ) => {
    if ( !res.ok ) throw new Error( 'failed to parse blog data\n' );
    return res.json( );
  }).then( ( data ) => {
    var blog_html = ``;
    
    data.posts.forEach( poast => {
      blog_html += createBlogPost( poast );
    });

    blog.innerHTML = blog_html;
  }).catch( ( e ) => {
    console.log( "day fucked up, tell oya and move along.\n" );
  });

  addBlogDD( blog );

  var tagline = document.getElementById( 'tagline' );
  if ( !tagline ) {
    var zalgo = "w̵̧̲̞̙̥̺̝̥̤͉̟͔͇̤̬̜͒̈̔̃̿͊͊̿̆̚ͅh̵̢͖̠͐̄̆̓̓̏́̆̈́͆͂͘̕͝ā̶̢̛̫͍̮̥̤̜̣͕͚̳̝̣̺͇̣̂̎̐̿̀́̀̓t̸̤͚͊̄̀͆̈́͑̈́̈́̔̍̎̈́̍͝ ̶̱͈͊̈̂̂t̴͚̠͖̞͎̘̳̄̀͌̏ḩ̴̢̣̝̗̘̻̤͗̈ĕ̷̗̩̱̘͈̯̤̽͛̓̍̋̆̄̈́̑̈́́́̑͛͠͝ ̴̡̡͇̖͓̜̦̫̹̭͙̯̤̍̈͋̏͌̐͗̑̎̐́̒̈́ͅf̷̧͕͖͉͍͕̺̳͚̤̤̥͗́͜u̴̢̢͖̦͓̭̩͇͈͍͋͂̓̊ͅç̸͉͇͉̟̇͂̀̔̈́͋̈́̉̒͆̏́͑̍̕͝͝k̵̨̡̡̝͙̠̓́̍́̅͊̂̒͘̕͘ ̵̧̨̛͖̻̤̲̻̟̓͊͗̾̋̇̽̎͊̕͝m̴̡̛͉̈́̄̀̊̅͋̈͋̓̊̀͌a̵̡̤̣̭͕̖̣̬͗̀́̽͐̈́̿̕̚ñ̸̨̡̬̳̞̖̪̩̖͓͉̮̘̫̰̤̽͂͊̌͝.̴̨̾";
    for( ;; )
      document.getElementsByTagName( 'body' )[ 0 ].innerText += zalgo;
  } else sparkleAnim( );
});

function createBlogPost( data ) {
  if ( !data.title || !data.date || !data.time || !data.body )
    console.log( "oya fucked up ( the JaySAWN ) this time, TELL HIM!" );

  return `
    <div class="blog-poast">
      <div class="blog-poast-header">
        <div class="blog-poast-header-name">
          <img src="./data/images/oya.jpg" style="height: 24px; width: auto;">
          <span class="blog-poast-title">${ data.title }</span>
        </div>
        <div class="blog-poast-header-datetime">
          <span class="blog-poast-date">
            ${ data.date }
            <span class="blog-poast-time">
              ${ data.time }
            </span>
          </span>
        </div>
      </div>
      <div class="blog-poast-body">
        <span class="blog-poast-body-text">${ data.body }</span>
        ${
          data.media === null ? '' :
          `<img src="${data.media}">`
        }
      </div>
    </div>
  `;
}

function addBlogDD( blog ) {
  var poasts = Array.from( blog.children );

  if ( poasts.length === 0 )
    setTimeout( ( ) => { addBlogDD( document.getElementById( 'blog' ) ); }, 500 );

  poasts.forEach( post => {
    post.addEventListener( 'click', ( e ) => {
      const body = post.querySelector( '.blog-poast-body' );

      const isExpanded = body.style.height !== '0px' && body.style.height !== '';

      poasts.forEach( p => {
        var other_body = p.querySelector( '.blog-poast-body' );
        other_body.style.visibility = "hidden";
        other_body.style.display = "none";
        other_body.style.height = 0;
      });

      if ( isExpanded ) {
        body.style.visibility = "hidden";
        body.style.display = "none";
        body.style.height = 0;
      } else {
        body.style.visibility = "visible";
        body.style.height = "min-content";
        body.style.display = "flex";
      }
    });
  });
}

function sparkleAnim( ) {
  // thanks - https://codepen.io/adamcurzon/pen/poBGxJY
  const sparkle = document.querySelector(".sparkle");

  var current_star_count = 0;

  const MAX_STARS = 5;
  const STAR_INTERVAL = 32;

  const MAX_STAR_LIFE = 3;
  const MIN_STAR_LIFE = 1;

  const MAX_STAR_SIZE = 32;
  const MIN_STAR_SIZE = 16;

  const MIN_STAR_TRAVEL_X = 50;
  const MIN_STAR_TRAVEL_Y = 50;

  const Star = class {
    constructor() {
      this.size = this.random(MAX_STAR_SIZE, MIN_STAR_SIZE);

      this.x = this.random(
        sparkle.offsetWidth * 0.75,
        sparkle.offsetWidth * 0.25
      );
      this.y = sparkle.offsetHeight / 2 - this.size / 2;

      this.x_dir = this.randomMinus();
      this.y_dir = this.randomMinus();

      this.x_max_travel =
        this.x_dir === -1 ? this.x : sparkle.offsetWidth - this.x - this.size;
      this.y_max_travel = sparkle.offsetHeight / 2 - this.size;

      this.x_travel_dist = this.random(this.x_max_travel, MIN_STAR_TRAVEL_X);
      this.y_travel_dist = this.random(this.y_max_travel, MIN_STAR_TRAVEL_Y);

      this.x_end = this.x + this.x_travel_dist * this.x_dir;
      this.y_end = this.y + this.y_travel_dist * this.y_dir;

      this.life = this.random(MAX_STAR_LIFE, MIN_STAR_LIFE);

      this.star = document.createElement("div");
      this.star.classList.add("star");

      this.star.style.setProperty("--start-left", this.x + "px");
      this.star.style.setProperty("--start-top", this.y + "px");

      this.star.style.setProperty("--end-left", this.x_end + "px");
      this.star.style.setProperty("--end-top", this.y_end + "px");

      this.star.style.setProperty("--star-life", this.life + "s");
      this.star.style.setProperty("--star-life-num", this.life);

      this.star.style.setProperty("--star-size", this.size + "px");
      this.star.style.setProperty("--star-color", this.randomPurpleColor());
    }

    draw() {
      sparkle.appendChild(this.star);
    }

    pop() {
      sparkle.removeChild(this.star);
    }

    random(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomPurpleColor(){
      return "hsla(" + this.random(290, 270) + ", 100%, " + this.random(70, 40) + "%, 1)";
    }

    randomMinus() {
      return Math.random() > 0.5 ? 1 : -1;
    }
  };

  setInterval(() => {
    if (current_star_count >= MAX_STARS) {
      return;
    }

    current_star_count++;

    var newStar = new Star();

    newStar.draw();

    setTimeout(() => {
      current_star_count--;

      newStar.pop();
    }, newStar.life * 1000);
  }, STAR_INTERVAL);
}